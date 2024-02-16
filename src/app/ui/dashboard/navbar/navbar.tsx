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

export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
          <Link href="/dashboard">
            <MdMenu size={30} />
          </Link>
          <ModeToggle />
          {/* <MdOutlineChat size={20} /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
