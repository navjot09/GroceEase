"use server";

import { Product } from "@/types/product";
import { cookies } from "next/headers";

type Params = {
  subCategory?: string;
  category: string;
  limit?: number;
  offset?: number;
  sort?: string;
  search?: string;
};

export const getProducts = async ({
  category,
  subCategory,
  limit,
  offset,
  sort,
  search,
}: Params) => {
  try {
    const params: any = { limit: limit ?? 20, offset: offset ?? 0 };
    if (category) params.category = category;
    if (subCategory) params.subCategory = subCategory;
    if (sort) params.sort = sort;
    if (search) params.search = search;
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/products?` +
        new URLSearchParams(params).toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Product[],
      };
    }
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  } catch (error) {
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  }
};
