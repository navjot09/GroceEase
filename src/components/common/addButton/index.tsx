"use client";
import Image from "next/image";
import { CartActive } from "../../../../public/assets";
import { useState } from "react";
import { addToCart, removeFromCart } from "@/actions/cart";
import { useCart } from "@/context/cart";

type Props = {
  size: "sm" | "lg";
  id: string;
  callback?: () => void;
};

export const AddButton = ({ size, id, callback }: Props) => {
  const { quantities, ready, adjustQuantity, beginMutation, endMutation } =
    useCart();
  const [pending, setPending] = useState(false);
  const quantity = quantities[id] ?? 0;

  // Disabled until the shared cart has loaded, so a click can never apply to an
  // unknown baseline — a product already in the cart renders as "Add" (quantity
  // defaults to 0) until the fetch lands. This is one fetch for the whole page
  // now, not one per button, so the wait is short.
  const busy = pending || !ready;

  // Adjust before awaiting, so the click reads as instant. The delta is relative
  // because the backend applies $inc and owns the resulting count.
  const addProduct = async () => {
    setPending(true);
    beginMutation(id);
    adjustQuantity(id, 1);
    const { success } = await addToCart(id);
    if (!success) adjustQuantity(id, -1);
    endMutation(id);
    if (callback) callback();
    setPending(false);
  };

  const removeProduct = async () => {
    if (quantity === 0) return;
    setPending(true);
    beginMutation(id);
    adjustQuantity(id, -1);
    const { success } = await removeFromCart(id);
    if (!success) adjustQuantity(id, 1);
    endMutation(id);
    if (callback) callback();
    setPending(false);
  };

  return (
    <div
      className={`${
        size === "lg" ? "scale-110 h-8" : "h-7"
      } relative overflow-hidden`}
    >
      {quantity === 0 ? (
        <button
          disabled={busy}
          onClick={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <div className=" flex gap-1 bg-[#DEF9EC] py-1 px-3 rounded hover:bg-[#C5EAD9C7]">
            <Image src={CartActive} alt="Cart" width={14} height={14} />
            <p className=" color-active text-sm font-semibold">Add</p>
          </div>
        </button>
      ) : (
        <button disabled={busy}>
          <div className=" flex gap-1 bg-[#DEF9EC] rounded items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                if (busy) return;
                removeProduct();
              }}
              className=" px-2 py-1 border-r hover:bg-[#C5EAD9C7]"
            >
              <p className=" color-active text-sm font-semibold">-</p>
            </div>
            <p className=" color-active text-sm font-semibold min-w-[15px]">
              {quantity}
            </p>
            <div
              onClick={(e) => {
                e.preventDefault();
                if (busy) return;
                addProduct();
              }}
              className=" px-2 py-1 border-l hover:bg-[#C5EAD9C7]"
            >
              <p className=" color-active text-sm font-semibold">+</p>
            </div>
          </div>
        </button>
      )}
      {busy && (
        <div className=" absolute bottom-0 h-1 rounded-b animate-loading bg-green-400" />
      )}
    </div>
  );
};
