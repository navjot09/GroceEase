"use server";

import { Address } from "@/types/address";
import { cookies } from "next/headers";
import { ZodIssue, z } from "zod";

export async function getAddress() {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-cache",
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Address[],
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
}

const User = z.object({
  addressLine1: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(1),
  zipCode: z.number().min(1000),
});

export async function addAddress(
  prevState: any,
  formData: FormData
): Promise<{
  validationFail: boolean;
  errors: ZodIssue[];
  message: string;
  success: boolean;
}> {
  const addressLine1 = formData.get("addressLine1");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = Number(formData.get("zipCode"));

  try {
    const parse = User.safeParse({
      addressLine1,
      city,
      state,
      zipCode,
    });
    if (!parse.success) {
      return {
        validationFail: true,
        errors: parse.error.issues,
        success: false,
        message: "Validation Failed",
      };
    }
    const data = parse.data;
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    const response = await res.json();
    if (res.status === 201 && response?.success) {
      return {
        validationFail: false,
        errors: [],
        success: true,
        message: "Address added Succesfully",
      };
    }
    return {
      validationFail: false,
      errors: [],
      success: false,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      validationFail: false,
      errors: [],
      message: "Failed to add Address",
    };
  }
}
