import Image from "next/image";
import "./styles.css";
import { HomeMain, Send } from "../../../../../public/assets";
import Container from "@/components/common/container";

export const NewsLetter = async () => {
  return (
    <main className=" newsletter-background">
      <Container>
        <div className="lg:flex">
          <div className="basis-1/2 order-2">
            <Image
              className="lg:absolute lg:right-0 float-right"
              src={HomeMain}
              alt="grocery-search"
            />
          </div>
          <div className="basis-1/2 py-12 lg:py-24 px-4 lg:px-0 gap-6 flex flex-col order-1">
            <h1 className=" text-4xl lg:text-6xl font-bold color-primary text-center lg:text-start">
              Don’t miss our daily <br className="hidden lg:block" /> amazing
              deals.
            </h1>
            <h5 className=" text-lg lg:text-xl text-[#838383] font-semibold lg:mt-7 lg:mb-12 text-center lg:text-start">
              Save up to 60% off on your first order
            </h5>
            <div className=" flex bg-[#F3F3F3]  items-center w-full lg:w-2/3">
              <Image
                src={Send}
                width={24}
                height={24}
                className=" mx-2"
                alt="grocery-search"
              />
              <input
                className="bg-transparent focus:outline-none grow px-2"
                placeholder="Enter your email"
              />
              <div className="bg-[#3BB77E] p-2 py-3">
                <p className=" text-base font-semibold text-white">Subscribe</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
