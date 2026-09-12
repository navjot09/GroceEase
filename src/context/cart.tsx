"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { getCartItems } from "@/actions/cart";

type CartCtx = {
  quantities: Record<string, number>;
  ready: boolean;
  adjustQuantity: (productId: string, delta: number) => void;
  beginMutation: (productId: string) => void;
  endMutation: (productId: string) => void;
  seed: (entries: Record<string, number>) => void;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartCtx>({
  quantities: {},
  ready: false,
  adjustQuantity: () => {},
  beginMutation: () => {},
  endMutation: () => {},
  seed: () => {},
  refresh: async () => {},
});

export const useCart = () => useContext(CartContext);

/**
 * Fetches the cart ONCE per page and shares every quantity through context.
 *
 * Previously each AddButton fetched the whole cart from its own useEffect, and
 * ProductCard mounted two buttons per product. Next dispatches client-invoked
 * server actions through a single-slot queue, so a 20-product grid meant 40
 * strictly sequential round trips to answer 20 questions that one response
 * already contained — and a user's add click queued behind all of them.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  // Per-product count of mutations in flight. A server response that was
  // requested before such a mutation must not overwrite its optimistic value
  // with pre-mutation state. A counter, not a Set: the same product can have
  // two overlapping clicks, and the first to finish must not clear the guard
  // while the second is still outstanding.
  const inFlight = useRef<Record<string, number>>({});

  const beginMutation = useCallback((productId: string) => {
    inFlight.current[productId] = (inFlight.current[productId] ?? 0) + 1;
  }, []);

  const endMutation = useCallback((productId: string) => {
    const left = (inFlight.current[productId] ?? 1) - 1;
    if (left > 0) inFlight.current[productId] = left;
    else delete inFlight.current[productId];
  }, []);

  // Server state wins, except for products with a mutation still in flight.
  const merge = useCallback(
    (incoming: Record<string, number>, replace: boolean) => {
      setQuantities((prev) => {
        const next = replace ? { ...incoming } : { ...prev, ...incoming };
        Object.keys(inFlight.current).forEach((id) => {
          if (id in prev) next[id] = prev[id];
        });
        return next;
      });
    },
    []
  );

  const refresh = useCallback(async () => {
    const { success, data } = await getCartItems();
    if (success && data) {
      const next: Record<string, number> = {};
      for (const item of data) next[item.ProductId] = item.Quantity;
      merge(next, true);
    }
    // Marked ready even on failure, so a transient error cannot leave every
    // button permanently disabled. The resync effect below is the recovery path.
    setReady(true);
  }, [merge]);

  // Relative, not absolute: the backend applies $inc and is authoritative about
  // the resulting count, so a click must never bake in a possibly-stale base.
  const adjustQuantity = useCallback((productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] ?? 0) + delta),
    }));
  }, []);

  // Lets a page that already holds quantities (the cart page's itinerary) fill
  // them in without waiting for the provider's own fetch.
  const seed = useCallback(
    (entries: Record<string, number>) => merge(entries, false),
    [merge]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Resync on client-side navigation and when the tab regains focus, so a
  // failed initial fetch — or a change made in another tab — self-heals
  // instead of persisting until a hard reload.
  useEffect(() => {
    void refresh();
  }, [pathname, refresh]);

  useEffect(() => {
    const onFocus = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    window.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({
      quantities,
      ready,
      adjustQuantity,
      beginMutation,
      endMutation,
      seed,
      refresh,
    }),
    [
      quantities,
      ready,
      adjustQuantity,
      beginMutation,
      endMutation,
      seed,
      refresh,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
