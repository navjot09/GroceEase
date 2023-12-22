"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export const getMyDetails = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "force-cache",
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as User,
      };
    }
    return {
      success: false,
      error: "Failed to fetch cart items",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const logout = () => {
  console.log("called");
  cookies().set("token", "", { expires: 0 });
};
