import Image from "next/image";
import { ArrowRightWhite, Promo1, Promo2 } from "../../../../../public/assets";
import "./styles.css";
import Container from "@/components/common/container";
const data = [
  {
    id: 1,
    image: Promo1,
    pill: "Free delivery",
    heading: "Free delivery over $50",
    desc: "Shop $50 product and get free delivery anywhre.",
    button: "Shop Now",
  },
  {
    id: 2,
    image: Promo2,
    pill: "60% off",
    heading: "Organic Food",
    desc: "Save up to 60% off on your first order.",
    button: "Order Now",
  },
];

export const Promos = async () => {
  return (
    <Container>
      <div className=" lg:flex gap-4">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className={` basis-1/2 ${
                item.id === 1 ? "bg-[#FFF5E1D9]" : "bg-[#c5ead9c7]"
              } background flex flex-col lg:flex-row justify-center pt-8`}
            >
              <div className=" ml-4 lg:ml-10 flex flex-col items-start justify-between pb-10">
                <div className=" flex flex-col gap-4 mb-5">
                  <div
                    className={`${
                      item.id === 1 ? "bg-[#FFD480]" : "bg-[#3BB77E]"
                    } w-fit px-3 py-1 rounded`}
                  >
                    <p className=" text-white text-sm font-medium">
                      {item.pill}
                    </p>
                  </div>
                  <h3 className=" text-3xl font-semibold color-primary">
                    {item.heading}
                  </h3>
                  <p className=" text-lg font-medium text-[#838383]">
                    {item.desc}
                  </p>
                </div>
                <button className=" bg-[#3BB77E] px-3 py-2 flex items-center">
                  <p className=" text-white text-base font-semibold">
                    {item.button}
                  </p>
                  <Image
                    className="inline ml-1"
                    src={ArrowRightWhite}
                    alt="arrow"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <Image
                className={`${
                  item.id === 1 ? "mr-2 self-center" : " self-end"
                } inline`}
                src={item.image}
                alt="promos"
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
