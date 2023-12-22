"use server";
import { Category, CategoryWithChildren } from "@/types/category";
import { cookies } from "next/headers";

export const getCategoriesWithChildren = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/categories?include=children`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        next: { revalidate: 24 * 60 * 60 },
      }
    );

    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as CategoryWithChildren[],
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

export const getCategories = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      next: { revalidate: 24 * 60 * 60 },
    });

    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Category[],
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
