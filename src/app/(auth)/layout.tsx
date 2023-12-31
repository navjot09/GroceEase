import Image from "next/image";
import { AuthPage } from "../../../public/assets";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className=" lg:flex w-screen h-screen">
      <div className=" basis-1/2 justify-center items-center flex h-full">
        {children}
      </div>
      <div className=" hidden lg:block basis-1/2">
        <Image
          src={AuthPage}
          alt="grocery"
          className=" w-full h-full object-cover "
        />
      </div>
    </main>
  );
}
