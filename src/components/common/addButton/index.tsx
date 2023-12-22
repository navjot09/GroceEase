"use client";
import Image from "next/image";
import { CartActive } from "../../../../public/assets";
import { useEffect, useState } from "react";
import { addToCart, getCartItems, removeFromCart } from "@/actions/cart";

type Props = {
  size: "sm" | "lg";
  id: string;
  callback?: () => void;
};

export const AddButton = ({ size, id, callback }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const addProduct = async () => {
    setLoading(true);
    const { success } = await addToCart(id);
    if (success) {
      setQuantity((prev) => prev + 1);
    }
    if (callback) callback();
    setLoading(false);
  };

  const removeProduct = async () => {
    setLoading(true);
    const { success } = await removeFromCart(id);
    if (success) setQuantity((prev) => prev - 1);
    if (callback) callback();
    setLoading(false);
  };

  useEffect(() => {
    const getCount = async () => {
      setLoading(true);
      const { success, data } = await getCartItems();
      if (success) {
        const res = data?.find((item) => item.ProductId === id)?.Quantity ?? 0;
        setQuantity(res);
      }
      setLoading(false);
    };
    getCount();
  }, [id]);

  return (
    <div
      className={`${
        size === "lg" ? "scale-110 h-8" : "h-7"
      } relative overflow-hidden`}
    >
      {quantity === 0 ? (
        <button
          disabled={loading}
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
        <button disabled={loading}>
          <div className=" flex gap-1 bg-[#DEF9EC] rounded items-center">
            <div
              onClick={(e) => {
                e.preventDefault();
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
                addProduct();
              }}
              className=" px-2 py-1 border-l hover:bg-[#C5EAD9C7]"
            >
              <p className=" color-active text-sm font-semibold">+</p>
            </div>
          </div>
        </button>
      )}
      {loading && (
        <div className=" absolute bottom-0 h-1 rounded-b animate-loading bg-green-400" />
      )}
    </div>
  );
};
