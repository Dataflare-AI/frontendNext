"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginForm() {
  return (
    <form>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex items-center justify-center w-full md:w-1/3 h-full relative md:ml-32 lg:bg-white">
          <Image
            src="/loginMobile.jpeg"
            alt="Login Image"
            width={600}
            height={400}
            className="object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-center w-full md:w-2/3 h-full text-black bg-white lg:bg-white">
          <div className="w-full max-w-md">
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={60}
                quality={100}
                className="mx-auto"
              />
            </div>
            <button onClick={() => signIn("google")}>Login</button>
          </div>
        </div>
      </div>
    </form>
  );
}
