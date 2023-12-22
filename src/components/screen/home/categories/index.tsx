import Container from "@/components/common/container";
import Image from "next/image";
import { ArrowRight } from "../../../../../public/assets";
import { ResponsiveType } from "react-multi-carousel";
import { CommonCarousel } from "@/components/common/carousel";
import { cookies } from "next/headers";
import { Category } from "@/types/category";
import Link from "next/link";
const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 5.5,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 4.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.2,
  },
};

const getData = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      next: { revalidate: 24 * 60 * 60 },
    });

    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Category[],
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

export const Categories = async () => {
  const { success, error, data } = await getData();
  return (
    <main className="!pb-0 py-12 lg:py-24 px-4 lg:px-0">
      <Container>
        <div className="">
          <h2 className=" text-3xl lg:text-4xl font-semibold">
            Explore Categories
          </h2>
        </div>
        <CommonCarousel
          itemClass=" flex"
          showButtons={true}
          renderButtonGroupOutside
          arrows={false}
          sliderClass=" !my-8 lg:!my-12"
          responsive={responsive}
        >
          {data?.map((item) => {
            return (
              <Link
                href={`/products/${item._id}`}
                key={item._id}
                className=" flex flex-col cursor-pointer group w-64 rounded-xl overflow-hidden pb-3 lg:transition-all lg:duration-300 lg:ease-in-out shadow-sm lg:hover:shadow-md lg:hover:translate-y-[-10px] border "
              >
                <figure className=" overflow-hidden">
                  <Image
                    className="lg:group-hover:scale-125 lg:transition-transform lg:duration-300 lg:ease-in-out h-64 object-cover"
                    src={item.Image}
                    alt="Hello"
                    width={256}
                    height={300}
                  />
                </figure>
                <div className=" px-2 py-3 flex flex-col gap-2 flex-1 justify-between">
                  <h3 className=" text-2xl font-semibold color-primary">
                    {item.Name}{" "}
                    <span className="inline-block lg:scale-x-0 lg:group-hover:scale-x-100 right origin-left lg:transition-all lg:duration-300 lg:ease-in-out">
                      <Image src={ArrowRight} alt="Arrow" width={20} />
                    </span>
                  </h3>
                  <p className=" text-base line-clamp-3 color-primary">
                    {item.Description}
                  </p>
                </div>
              </Link>
            );
          })}
        </CommonCarousel>
      </Container>
    </main>
  );
};
