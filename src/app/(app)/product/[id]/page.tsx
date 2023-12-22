import { AddButton } from "@/components/common/addButton";
import Container from "@/components/common/container";
import { RatingWithNumber } from "@/components/common/rating";
import { Product } from "@/types/product";
import { Rating } from "flowbite-react";
import { cookies } from "next/headers";
import Image from "next/image";

const getProduct = async (id: string) => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Product,
      };
    }
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  } catch (error) {
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  }
};

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await getProduct(params.id);
  if (!product) return null;
  return (
    <Container>
      <div className=" lg:flex py-8 lg:py-16">
        <div className=" hidden lg:flex basis-1/2 justify-center">
          <Image
            src={product?.Image}
            alt={product?.Name}
            width={400}
            height={500}
          />
        </div>
        <div className=" lg:hidden basis-1/2 justify-center flex">
          <Image
            src={product?.Image}
            alt={product?.Name}
            width={300}
            height={250}
          />
        </div>
        <div className=" basis-1/2 p-6">
          <p className=" text-xl font-semibold color-disabled mb-2">
            {product.Brand}
          </p>

          <p className=" font-semibold text-2xl color-primary">
            {product.Name}
          </p>
          <p className=" font-semibold text-lg color-primary">
            {product.Quantity}
          </p>
          <div className=" my-4">
            <RatingWithNumber rating={product.Rating} />
          </div>
          <div className=" flex items-center py-2 gap-6">
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
            <AddButton id={product._id} size="lg" />
          </div>
          <p className=" text-xl font-semibold color-primary underline">
            Description
          </p>
          <p className=" text-base font-medium color-primary mb-4">
            {product.Description}
          </p>
        </div>
      </div>
    </Container>
  );
}
