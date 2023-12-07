import Container from "@/components/common/container";
import {
  BestPrice,
  FreeDelivery,
  Refundable,
} from "../../../../../public/assets";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

const data = [
  {
    id: 1,
    heading: "Best Prices & Deals",
    desc: "Don’t miss our daily amazing deals and prices",
    icon: BestPrice,
  },
  {
    id: 2,
    heading: "Refundable",
    desc: "If your items have damage we agree to refund it",
    icon: Refundable,
  },
  {
    id: 3,
    heading: "Free delivery",
    desc: "Do purchase over $50 and get free delivery anywhere",
    icon: FreeDelivery,
  },
];

export const Features = () => {
  return (
    <main>
      <Container>
        <div className=" flex flex-col lg:flex-row px-4 lg:px-0 gap-6 lg:gap-0 py-12 lg:py-24">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className=" flex lg:basis-1/3 items-start gap-3 justify-center"
              >
                <Image src={item.icon} alt={item.heading} />
                <div className=" lg:basis-2/3">
                  <h3 className=" text-base lg:text-lg font-semibold color-primary">
                    {item.heading}
                  </h3>
                  <p className=" color-disabled font-medium text-sm lg:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
};
