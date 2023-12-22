"use client";
import { CategoryWithChildren } from "@/types/category";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  data: CategoryWithChildren;
  parent?: string;
};

export const Tabs = ({ data, parent }: Props) => {
  const searchParams = useSearchParams();
  const subcat = searchParams.get("subcat");
  return (
    <>
      <div className=" hidden lg:block">
        <div className=" border sticky top-0 h-screen overflow-scroll">
          <Link href={`/products/${parent}`}>
            <div
              className={`bg-white hover:bg-green-200 py-4 px-2 ${
                subcat ? "" : "border-l-4 border-green-500 !bg-green-200"
              }`}
            >
              <p className=" text-lg color-primary font-bold">
                {data.parent.Name}
              </p>
            </div>
          </Link>
          {data?.children?.map((item) => (
            <Link href={`?subcat=${item._id}`} key={item._id}>
              <div
                className={`bg-white hover:bg-green-200 py-4 px-2 ${
                  subcat === item._id
                    ? "border-l-4 border-green-500 !bg-green-200"
                    : ""
                }`}
              >
                <p className=" text-base color-primary font-medium">
                  {item.Name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex lg:hidden bg-green-200 py-2 justify-center mb-3">
        <Dropdown
          inline
          label={
            <p className="text-center text-lg font-semibold line-clamp-1 color-primary">
              {subcat
                ? data.children.find((item) => item._id === subcat)?.Name
                : data.parent.Name}
            </p>
          }
          className=" w-[90vw] left-0"
        >
          <div className=" h-[75vh] overflow-scroll">
            <Dropdown.Item
              className={`bg-white hover:bg-green-200 py-4 px-2 ${
                subcat ? "" : " !bg-green-200"
              }`}
            >
              <Link href={`/products/${parent}`}>
                <p className=" text-lg color-primary font-bold">
                  {data.parent.Name}
                </p>
              </Link>
            </Dropdown.Item>
            {data?.children?.map((item) => (
              <Dropdown.Item
                key={item._id}
                className={`bg-white py-4 px-2 ${
                  subcat === item._id ? " !bg-green-200" : ""
                }`}
              >
                <Link href={`?subcat=${item._id}`}>
                  <p className=" text-base color-primary font-medium">
                    {item.Name}
                  </p>
                </Link>
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>
    </>
  );
};
