"use client";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="focus:outline-none">
      {isDarkMode ? (
        <Moon className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.menu}>
        {/* <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.input}
          />
        </div> */}
        <div className={styles.icons}>
          {/* <Link href="/dashboard">
            <MdMenu size={30} />
          </Link> */}
          <ModeToggle />
          {/* <MdOutlineChat size={20} /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
