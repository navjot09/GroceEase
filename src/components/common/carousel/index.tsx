"use client";
import Image from "next/image";
import Carousel, {
  ButtonGroupProps,
  CarouselProps,
} from "react-multi-carousel";
import { ReactNode, useRef } from "react";
import { ArrowLeft, ArrowRight } from "../../../../public/assets";
const ButtonGroup = ({ next, previous }: ButtonGroupProps) => {
  return (
    <div className=" flex justify-end gap-5">
      <button
        className="bg-[#F2F3F4] p-3 rounded-full shadow-lg active:bg-[#D4D4D4]"
        onClick={previous}
      >
        <Image src={ArrowLeft} alt="Hello" width={20} />
      </button>
      <button
        className="bg-[#F2F3F4] p-3 rounded-full shadow-lg active:bg-[#D4D4D4]"
        onClick={next}
      >
        <Image src={ArrowRight} alt="Hello" width={20} />
      </button>
    </div>
  );
};

type ICarouselProps = CarouselProps & {
  children: ReactNode;
  showButtons: Boolean;
};

export const CommonCarousel = ({
  children,
  showButtons,
  responsive,
  ...props
}: ICarouselProps) => {
  const carousel = useRef<Carousel>(null);
  return (
    <Carousel
      {...props}
      customButtonGroup={<ButtonGroup />}
      renderButtonGroupOutside
      ref={carousel}
      arrows={false}
      sliderClass=" !my-8 lg:!my-12"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
};
