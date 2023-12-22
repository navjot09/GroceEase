import { DiscountWrapper, Heart, HeartActive } from "../../../../public/assets";
import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import { AddButton } from "../addButton";
import { RatingWithNumber } from "../rating";

export const ProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = (price: number, discount: number) => {
    return Math.floor(((price - discount) / price) * 100);
  };
  return (
    <Link
      href={`/product/${product._id}`}
      className=" w-44 lg:w-52 rounded-xl overflow-hidden pb-3 flex flex-col items-center border gap-2 py-2 relative bg-white"
    >
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
      <figure className=" overflow-hidden">
        <Image
          className="object-contain"
          src={product.Image}
          alt="Hello"
          width={120}
          height={120}
        />
      </figure>
      <div className="px-2 flex flex-col gap-2 grow w-full">
        <p className=" text-sm font-medium color-disabled">{product.Brand}</p>
        <div className="grow">
          <p className=" font-semibold text-base leading-5 color-primary line-clamp-2">
            {product.Name} - ({product.Quantity})
          </p>
        </div>
        <div>
          <RatingWithNumber rating={product.Rating} />
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
          <div className=" hidden lg:block">
            <AddButton id={product._id} size="sm" />
          </div>
        </div>
        <div className=" flex lg:hidden justify-center">
          <AddButton id={product._id} size="sm" />
        </div>
      </div>
    </Link>
  );
};
