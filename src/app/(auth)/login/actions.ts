"use server";
import { ZodIssue, z } from "zod";
import { cookies } from "next/headers";
const User = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should have more than 8 characters" }),
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
    const res = await fetch("http://localhost:8080/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      console.log(response);
      const oneDay = 24 * 60 * 60 * 1000;
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
    console.log(JSON.stringify(error, null, 2), "error");
    return {
      success: false,
      validationFail: false,
      errors: [],
      message: "Login Failed",
    };
  }
}
