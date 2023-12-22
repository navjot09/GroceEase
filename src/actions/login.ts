"use server";
import { ZodIssue, z } from "zod";
import { cookies } from "next/headers";
const User = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should have more than 8 characters" }),
});

export async function login(
  prevState: any,
  formData: FormData
): Promise<{
  validationFail: boolean;
  errors: ZodIssue[];
  message: string;
  success: boolean;
}> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const parse = User.safeParse({
      email,
      password,
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
    const res = await fetch(
      `https://groceease.onrender.com/api/auth/loginUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      }
    );
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      const oneDay = 24 * 60 * 60;
      cookies().set("token", response?.data?.token, { maxAge: oneDay });
      return {
        validationFail: false,
        errors: [],
        success: true,
        message: "Logged In Succesfully",
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
      message: "Login Failed",
    };
  }
}
