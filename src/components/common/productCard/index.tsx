"use client";
import Container from "@/components/common/container";
import {
  CartActive,
  DiscountWrapper,
  Heart,
  HeartActive,
} from "../../../../public/assets";
import { useState } from "react";
import { Rating } from "flowbite-react";
import Image from "next/image";
import { Product } from "@/types/product";

export const ProductCard = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(0);
  const discountPercentage = (price: number, discount: number) => {
    return Math.floor(((price - discount) / price) * 100);
  };
  return (
    <div className=" cursor-pointer w-52 rounded-xl overflow-hidden pb-3 flex flex-col items-center border gap-2 py-2 relative">
      {product.OnSale && (
        <div className=" group absolute left-2 top-0">
          <Image
            className=" transition-all group-hover:scale-y-150"
            width={30}
            src={DiscountWrapper}
            alt="Discount"
          />
          <p className=" absolute top-1 left-1 text-xs font-extrabold text-white">
            {discountPercentage(product.Price, product.DiscountPrice)}%
          </p>
        </div>
      )}
      <div className=" absolute right-2 top-2">
        {true ? (
          <Image src={Heart} alt="Heart" width={20} height={20} />
        ) : (
          <Image src={HeartActive} alt="Heart" width={20} height={20} />
        )}
      </div>
      <figure className=" overflow-hidden">
        <Image
          className="object-contain"
          src={product.Image}
          alt="Hello"
          width={120}
          height={120}
        />
      </figure>
      <div className="px-2 flex flex-col gap-2">
        <p className=" text-sm font-medium color-disabled">{product.Brand}</p>
        <p className=" font-semibold text-base leading-5 color-primary line-clamp-2">
          {product.Name} - ({product.Quantity})
        </p>
        <div>
          <Rating size={"sm"}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Rating.Star key={item} filled={item <= (product?.Rating ?? 3)} />
            ))}
            <p className=" ml-1 text-base font-semibold color-active">
              {product.Rating ?? 3}
            </p>
          </Rating>
        </div>
        <div className=" flex justify-between items-center py-2">
          <div className=" flex gap-1 items-baseline">
            {product.OnSale ? (
              <>
                <p className=" color-active text-lg font-semibold">
                  ₹{product.DiscountPrice}
                </p>
                <p className=" color-disabled text-sm font-medium line-through">
                  ₹{product.Price}
                </p>
              </>
            ) : (
              <>
                <p className=" color-active text-lg font-semibold">
                  ₹{product.Price}
                </p>
              </>
            )}
          </div>
          {count === 0 ? (
            <button onClick={() => setCount(count + 1)}>
              <div className=" flex gap-1 bg-[#DEF9EC] py-1 px-3 rounded hover:bg-[#C5EAD9C7]">
                <Image src={CartActive} alt="Cart" width={14} height={14} />
                <p className=" color-active text-sm font-semibold">Add</p>
              </div>
            </button>
          ) : (
            <button>
              <div className=" flex gap-1 bg-[#DEF9EC] rounded items-center">
                <div
                  onClick={() => setCount(count - 1)}
                  className=" px-2 py-1 border-r hover:bg-[#C5EAD9C7]"
                >
                  <p className=" color-active text-sm font-semibold">-</p>
                </div>
                <p className=" color-active text-sm font-semibold min-w-[15px]">
                  {count}
                </p>
                <div
                  onClick={() => setCount(count + 1)}
                  className=" px-2 py-1 border-l hover:bg-[#C5EAD9C7]"
                >
                  <p className=" color-active text-sm font-semibold">+</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
