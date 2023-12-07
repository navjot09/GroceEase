"use client";
import Image from "next/image";
import { Grocery } from "../../../../public/assets";
import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { signup } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      isProcessing={pending}
      className=" mt-4"
      type="submit"
      title="Sign up"
    >
      <p className=" text-base font-bold">Sign Up</p>
    </Button>
  );
}

export default function Singup() {
  let [state, formAction] = useFormState(signup, null);
  const router = useRouter();
  useEffect(() => {
    console.log(state);
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
    <div className=" w-96">
      <Image src={Grocery} alt="Grocey" width={80} className=" mx-auto mb-4" />
      <form className="flex flex-col gap-4" action={formAction}>
        <div>
          <Label>
            <p className=" text-base font-medium">Name</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("name") ? "failure" : undefined
            }
            type="text"
            id="name"
            name="name"
            width={300}
            placeholder="Name"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("name")}
          </p>
        </div>
        <div>
          <Label>
            <p className=" text-base font-medium">Date Of Birth</p>
          </Label>
          <Datepicker id="date" name="date" maxDate={new Date()} />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("date")}
          </p>
        </div>
        <div>
          <Label>
            <p className=" text-base font-medium">Phone</p>
          </Label>
          <TextInput
            color={
              state?.validationFail && getError("phone") ? "failure" : undefined
            }
            id="phone"
            name="phone"
            type="number"
            placeholder="Phone"
          />
          <p className=" text-sm font-medium text-red-700 text-right">
            {state?.validationFail && getError("phone")}
          </p>
        </div>
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
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
