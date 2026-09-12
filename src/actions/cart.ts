"use server";

import { CartItem, Itinerary } from "@/types/cart";
import { cookies } from "next/headers";

export async function getCartItems() {
  try {
    const token = cookies().get("token");
    // Was `next: { tags: ["cartItems"], revalidate: 3600 }`. That cached a
    // per-user cart for an hour under a process-global tag, keyed by the JWT —
    // so it never warmed across logins and one user's add purged everyone's
    // entry. Its invalidation was also fire-and-forget (see addToCart below).
    // Now that the whole page makes one cart request instead of forty, the
    // cache is no longer load-bearing and correctness wins.
    const res = await fetch(`${process.env.API_HOST}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as CartItem[],
      };
    }
    return {
      success: false,
      error: "Failed to fetch cart items",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function addToCart(productId: string) {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/cartItems/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-store",
      }
    );
    // The revalidateTag pair that used to sit here in a setTimeout is gone:
    // no fetch carries the "cartItems" tag any more, and nothing in the repo
    // ever carried "itinerary". Deferring it past the response also made it
    // fire-and-forget — lost entirely on a host that freezes after responding.
    if (res.status === 204) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Failed to add product",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/cartItems/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-store",
      }
    );
    if (res.status === 204) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Failed to remove product",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function getItinerary() {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/cart/itinerary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    });
    if (res.status === 204) {
      return {
        success: true,
        empty: true,
      };
    }
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        empty: false,
        data: response?.data as Itinerary,
      };
    }
    return {
      success: false,
      error: "Failed to fetch cart items",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
