"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { openSans } from "@/app/ui/fonts";
// import ThemeChanger from "./DarkSwitch";

const Navbar = () => {
  const navigation = ["Produtos", "Segmentos", "Sobre", "Assinatura"];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItemClass = `${openSans.className}px-4 py-2 text-lg font-normal no-underline rounded-md dark:text-gray-200 hover:text-black focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800`;

  return (
    <header className="w-full bg-white">
      <nav className="container relative flex flex-wrap items-center justify-between mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <div className="px-4 flex items-center justify-between w-full lg:w-auto">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={60}
              quality={100}
              className="mx-auto"
            />
          </Link>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-gray-500 focus:text-gray-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
            role="button"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* menu mobile */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-wrap w-full my-5 px-5 slg:flex lg:hidden`}
        >
          {navigation.map((item) => (
            <Link
              key={item}
              href="/"
              className={`${menuItemClass} w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-gray-500 focus:text-gray-500 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none`}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/login"
            className={`${openSans.className}px-6 py-2 hover:bg-white hover:border-black hover:text-black hover:transition-colors bg-black text-white border border-transparent transition-border rounded-md  w-full text-center`}
          >
            Entrar
          </Link>
        </div>

        {/* Menu desktop */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu) => (
              <li className="text-gray-700 mr-3 nav__item" key={menu}>
                <Link href="/" className={menuItemClass}>
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link
            href="/login"
            className={`${openSans.className}px-6 py-2 hover:bg-white hover:border-black hover:text-black hover:transition-colors bg-black text-white border border-transparent transition-border rounded-md md:ml-5 w-40 text-center`}
          >
            Entrar
          </Link>

          {/* <ThemeChanger /> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
