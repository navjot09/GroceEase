"use server";
import { ZodIssue, z } from "zod";
import { cookies } from "next/headers";
const User = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name should have more than 3 characters" })
    .trim(),
  dateOfBirth: z.date(),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Invalid Phone" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should have more than 8 characters" }),
});

export async function signup(
  prevState: any,
  formData: FormData
): Promise<{
  validationFail: boolean;
  errors: ZodIssue[];
  message: string;
  success: boolean;
}> {
  const name = formData.get("name");
  const dateOfBirth = formData.get("date")?.toString() ?? Date.now();
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const parse = User.safeParse({
      name,
      dateOfBirth: new Date(dateOfBirth),
      phone,
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
    const res = await fetch(`${process.env.API_HOST}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      const oneDay = 24 * 60 * 60;
      cookies().set("token", response?.data?.token, { maxAge: oneDay });
      return {
        validationFail: false,
        errors: [],
        success: true,
        message: "Signed Up Succesfully",
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
      message: "Sign Up Failed",
    };
  }
}
