import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <Link href="/">
        <div className="flex items-center mb-4 cursor-pointer">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={60}
            quality={100}
            className="mx-auto"
          />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-md bg-gray-150 md:block"></div>
        <Link href="/login">
          <form
          //   action={async () => {
          //     "use server";
          //     await signOut();
          //   }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-150 p-3 text-sm font-medium hover:bg-gray-200 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </Link>
      </div>
    </div>
  );
}
