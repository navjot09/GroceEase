import Image from "next/image";
import "./styles.css";
import { HomeMain, Send } from "../../../../../public/assets";
import Container from "@/components/common/container";

export const NewsLetter = async () => {
  return (
    <main className=" newsletter-background">
      <Container>
        <div className="flex flex-col lg:flex-row">
          <div className="basis-1/2 order-2">
            <Image
              className="mx-auto h-auto w-full max-w-md lg:absolute lg:right-0 lg:mx-0 lg:w-auto lg:max-w-none"
              src={HomeMain}
              alt="grocery-search"
            />
          </div>
          <div className="basis-1/2 order-1 flex flex-col gap-6 py-12 lg:py-24">
            <h1 className=" text-4xl lg:text-6xl font-bold color-primary text-center lg:text-start">
              Don’t miss our daily <br className="hidden lg:block" /> amazing
              deals.
            </h1>
            <h5 className=" text-lg lg:text-xl text-[#838383] font-semibold lg:mt-7 lg:mb-12 text-center lg:text-start">
              Save up to 60% off on your first order
            </h5>
            <div className=" flex min-w-0 items-center bg-[#F3F3F3] lg:w-2/3">
              <Image
                src={Send}
                width={24}
                height={24}
                className=" mx-2"
                alt="grocery-search"
              />
              <input
                className="min-w-0 grow bg-transparent px-2 focus:outline-none"
                placeholder="Enter your email"
              />
              <div className="shrink-0 bg-[#3BB77E] px-2 py-3 sm:px-3">
                <p className="whitespace-nowrap text-sm font-semibold text-white sm:text-base">
                  Subscribe
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
