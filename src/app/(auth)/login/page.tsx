"use client";
import Image from "next/image";
import { Grocery } from "../../../../public/assets";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { login } from "../../../actions/login";
import { toast } from "react-toastify";
import { useEffect } from "react";
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      isProcessing={pending}
      className=" mt-4"
      type="submit"
      title="Log In"
    >
      <p className=" text-base font-bold">Login</p>
    </Button>
  );
}

export default function Login() {
  let [state, formAction] = useFormState(login, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/home", {});
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);
  const getError = (input: string) => {
    return state?.errors?.length
      ? state?.errors.find((error) => error.path.includes(input))?.message
      : "";
  };
  return (
    <div className=" w-96 mx-4 lg:mx-0">
      <Image src={Grocery} alt="Grocey" width={80} className=" mx-auto mb-4" />
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <Label>
            <p className=" text-base font-medium">Email</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("email") ? "failure" : undefined
            }
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("email")}
          </p>
        </div>
        <div>
          <Label>
            <p className=" text-base font-medium">Password</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("password")
                ? "failure"
                : undefined
            }
            id="password"
            name="password"
            type="Password"
            placeholder="Password"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("password")}
          </p>
        </div>
        <SubmitButton />
      </form>
      <p className=" text-sm text-center font-semibold mt-4">
        Already have an account?{" "}
        <Link
          className=" text-base text-blue-700 underline hover:text-blue-900"
          href="/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
