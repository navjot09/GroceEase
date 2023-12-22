"use client";
import { getProducts } from "@/actions/product";
import { ProductCard } from "@/components/common/productCard";
import { Product } from "@/types/product";
import { Dropdown, Spinner } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const sortOptions = [
  {
    id: 1,
    title: "Relevance",
  },
  {
    id: 2,
    title: "Price (High to Low)",
    sort: "Price:DESC",
  },
  {
    id: 3,
    title: "Price (Low to High)",
    sort: "Price:ASC",
  },
  {
    id: 4,
    title: "Rating (High to Low)",
    sort: "Rating:DESC",
  },
  {
    id: 5,
    title: "Rating (Low to High)",
    sort: "Rating:ASC",
  },
];

export const Grid = ({ category }: { category: string }) => {
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const params = useSearchParams();
  const subCategory = params.get("subcat");
  const sortId = Number(params.get("sort") ?? 1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [dataLeft, setDataLeft] = useState(true);
  const spinner = useRef(null);

  const getData = useCallback(async () => {
    const params: any = {
      category,
      offset,
      limit: 20,
    };
    if (subCategory) params.subCategory = subCategory;
    if (sortId !== 1)
      params.sort = sortOptions.find((item) => item.id === sortId)?.sort;
    const { success, data } = await getProducts(params);
    if (success && data?.length) {
      setPaginatedProducts((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 20);
      if (data.length < 20) setDataLeft(false);
    } else {
      setDataLeft(false);
    }
  }, [category, subCategory, offset, sortId]);

  useEffect(() => {
    const spinnerObs = spinner.current;
    const observer = new IntersectionObserver(async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) await getData();
    });
    if (spinnerObs) observer.observe(spinnerObs);
    return () => {
      if (spinnerObs) observer.unobserve(spinnerObs);
    };
  }, [spinner, getData]);

  useEffect(() => {
    setOffset(0);
    setDataLeft(true);
    setPaginatedProducts([]);
  }, [subCategory, sortId]);

  return (
    <div className=" bg-gray-50 p-4 lg:p-5 min-h-screen">
      <div className=" flex gap-2 items-center justify-end pb-5 lg:pe-10">
        <p className=" font-semibold text-sm">Sort by :</p>
        <Dropdown
          inline
          color="light"
          label={
            <p className=" font-semibold text-sm">
              {sortOptions.find((item) => item.id === sortId)?.title}
            </p>
          }
          dismissOnClick={true}
        >
          {sortOptions.map((item) => (
            <Dropdown.Item
              className={`${
                sortId === item.id ? "bg-green-200" : ""
              } hover:!bg-green-200`}
              key={item.id}
              onClick={() =>
                router.push(
                  subCategory
                    ? `?subcat=${subCategory}&sort=${item.id}`
                    : `?sort=${item.id}`
                )
              }
            >
              <p>{item.title}</p>
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <div className=" flex flex-wrap lg:gap-2 gap-1">
        {paginatedProducts?.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
      {dataLeft && (
        <div ref={spinner}>
          <div className="min-h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};
