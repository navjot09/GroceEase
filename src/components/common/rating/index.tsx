"use client";
import { Rating } from "flowbite-react";

export const RatingWithNumber = ({ rating }: { rating?: number }) => {
  return (
    <div>
      <Rating size={"sm"}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Rating.Star key={item} filled={item <= (rating ?? 1)} />
        ))}
        <p className=" ml-1 text-base font-semibold color-active">
          {rating ?? 1}
        </p>
      </Rating>
    </div>
  );
};
