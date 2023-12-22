import Container from "@/components/common/container";
import { ResponsiveType } from "react-multi-carousel";
import { ProductCard } from "@/components/common/productCard";
import { CommonCarousel } from "@/components/common/carousel";
import { cookies } from "next/headers";
import { FeaturedCategory } from "@/types/product";

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 7,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 5.8,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.9,
  },
};

const getData = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/products/featured`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      next: { revalidate: 24 * 60 * 60 },
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return response?.data as FeaturedCategory[];
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const FeaturedProducts = async () => {
  const data = await getData();
  return (
    <main className="py-12 lg:py-24 px-4 lg:px-0">
      <Container>
        {data?.map((item) => {
          return (
            <div key={item.Category._id} className=" py-4">
              <div className="">
                <h2 className=" text-3xl lg:text-4xl font-semibold">
                  {item.Category.Name}
                </h2>
              </div>
              <CommonCarousel
                showButtons={true}
                itemClass=" flex"
                renderButtonGroupOutside
                arrows={false}
                sliderClass=" !my-8 lg:!my-12"
                responsive={responsive}
              >
                {item.products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
              </CommonCarousel>
            </div>
          );
        })}
      </Container>
    </main>
  );
};
