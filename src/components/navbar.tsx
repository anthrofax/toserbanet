import Image from "next/image";
import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { LuGlasses } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";
import CategorySheet from "./category-sheet";
import SearchProduct from "./search-product";
import HamburgerButton from "./hamburger-button";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import LoginElements from "./login-elements";

function Navbar() {
  return (
    <nav className="min-h-20 py-5 px-5 md:px-10 lg:px-20 bg-slate-50/50 flex flex-col gap-3 fixed top-0 w-full z-10 shadow">
      <div className="flex-shrink-0 basis-full flex justify-between gap-3">
        <Link
          href={"/"}
          className="flex items-center gap-3 uppercase sm:text-xl"
        >
          <Image
            src="/logo.png"
            alt="toserbanet"
            width={24}
            height={24}
            className=""
          />
          <h1>Toserbanet</h1>
        </Link>

        <div className="justify-between gap-3 lg:gap-4 xl:gap-5 hidden lg:flex">
          <Link
            href={"/"}
            className="flex items-center gap-1 xl:gap-3 w-max text-base xl:text-lg"
          >
            <RiHome6Line className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link
            href={"/products"}
            className="flex items-center gap-1 xl:gap-3 w-max text-base xl:text-lg"
          >
            <LuGlasses className="text-2xl" />
            <span>Produk</span>
          </Link>
          <Link
            href={"/kontak"}
            className="flex items-center gap-1 xl:gap-3 w-max text-base xl:text-lg"
          >
            <BiPhoneCall className="text-2xl" />
            <span>Kontak Kami</span>
          </Link>
        </div>

        <div className="flex gap-2 justify-between items-center">
          <HamburgerButton />
          <SearchProduct className="relative hidden lg:block" />

          <Suspense
            fallback={
              <Skeleton className="bg-slate-300 w-8 aspect-square rounded-full" />
            }
          >
            <CategorySheet />
          </Suspense>

          <LoginElements />
        </div>
      </div>

      <SearchProduct className="relative block lg:hidden w-full place-self-end opacity-50 focus:opacity-100 focus-within::opacity-100 focus-visible:opacity-100 hover:opacity-100 active:opacity-100" />
    </nav>
  );
}

export default Navbar;
