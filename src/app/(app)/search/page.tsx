"use client";
import { getProducts } from "@/actions/product";
import Container from "@/components/common/container";
import { ProductCard } from "@/components/common/productCard";
import { Product } from "@/types/product";
import { Spinner } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Search() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const category = searchParams.get("c");
  const [offset, setOffset] = useState(0);
  const [dataLeft, setDataLeft] = useState(true);
  const spinner = useRef(null);

  const getData = useCallback(async () => {
    setLoading(true);
    const params: any = {
      offset,
      limit: 20,
      search,
    };
    if (category && category !== "all") params.category = category;
    const { success, data } = await getProducts(params);
    if (success && data?.length) {
      setProducts((prev) => [...prev, ...data]);
      if (data.length < 20) setDataLeft(false);
    } else {
      setDataLeft(false);
    }
    setLoading(false);
  }, [category, offset, search]);

  useEffect(() => {
    const spinnerObs = spinner.current;
    const observer = new IntersectionObserver(async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        setOffset((prev) => prev + 20);
      }
    });
    if (spinnerObs) observer.observe(spinnerObs);
    return () => {
      if (spinnerObs) observer.unobserve(spinnerObs);
    };
  }, [spinner, loading]);

  useEffect(() => {
    getData();
  }, [getData, offset]);

  useEffect(() => {
    setDataLeft(true);
    setProducts([]);
    setOffset(0);
  }, [search, category]);

  return (
    <Container>
      <div className=" mt-6 mb-11 mx-4 lg:mx-0">
        <div className=" flex flex-wrap gap-1 lg:gap-2">
          {products?.map((item) => (
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
    </Container>
  );
}
