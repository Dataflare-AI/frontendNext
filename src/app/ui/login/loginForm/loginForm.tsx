"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useFormState } from "react-dom";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <form>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex items-center justify-center w-full md:w-1/3 h-full relative md:ml-32">
          <Image
            src="/loginMobile.png"
            alt="Login Image"
            width={400}
            height={300}
            className="object-cover object-center"
          />
        </div>
        <div className="flex items-center justify-center w-full md:w-2/3 h-full">
          <div className="w-full max-w-md">
            <div className="text-center">
              <Image
                src="/Logo.png"
                alt="Logo"
                width={200}
                height={60}
                quality={100}
                className="mx-auto"
              />
              <button
                onClick={() => signIn("google")}
                className="mx-auto px-4 py-2 border flex gap-3 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                <Image
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  width={200}
                  height={60}
                  alt="google logo"
                />
                <span>Fazer Login com Google</span>
              </button>
              <div>ou</div>
              <h1 className="text-2xl">Faça login para continuar</h1>
            </div>
            <div className="w-full">
              <div className="rounded-lg px-6 pb-4">
                <div className="w-full mt-8">
                  <label className="block text-xs font-medium" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-black py-2 pl-10 text-sm outline-2"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Insira seu email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-xs font-medium"
                    htmlFor="password"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-black py-2 pl-10 pr-8 text-sm outline-2 "
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Insira sua senha"
                      required
                      minLength={6}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() =>
                    signIn("credentials", {
                      email,
                      password,
                      redirect: true,
                      callbackUrl: "/",
                    })
                  }
                  disabled={!email || !password}
                  className="mt-4 py-2 border-black hover:bg-black hover:text-white hover:transition-colors bg-white text-black border hover:border-white transition-border rounded-md w-full text-center"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
