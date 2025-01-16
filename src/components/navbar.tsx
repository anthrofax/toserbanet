import Image from "next/image";
import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { CiDiscount1, CiSearch, CiUser } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSettings2 } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";

function Navbar() {
  return (
    <nav className="min-h-20 py-5 px-5 md:px-10 lg:px-20 relative bg-slate-50 flex flex-col gap-3">
      <div className="flex-shrink-0 basis-full flex justify-between">
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

        <div className="justify-between gap-3 xl:gap-5 hidden lg:flex">
          <Link
            href={""}
            className="flex items-center gap-3 w-max text-base xl:text-xl"
          >
            <RiHome6Line className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link
            href={""}
            className="flex items-center gap-3 w-max text-base xl:text-xl"
          >
            <CiUser className="text-2xl" />
            <span>Tentang</span>
          </Link>
          <Link
            href={""}
            className="flex items-center gap-3 w-max text-base xl:text-xl"
          >
            <CiDiscount1 className="text-2xl" />
            <span>Promo</span>
          </Link>
          <Link
            href={""}
            className="flex items-center gap-3 w-max text-base xl:text-xl"
          >
            <BiPhoneCall className="text-2xl" />
            <span>Kontak Kami</span>
          </Link>
        </div>

        <div className="flex gap-2 justify-between items-center">
          <GiHamburgerMenu className="block lg:hidden text-2xl" />
          <form className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Cari Produk"
              className="rounded-full border-2 border-slate-400 py-2 px-5 w-full"
            />
            <button className="bg-slate-950 absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full">
              <CiSearch className="text-white text-2xl" />
            </button>
          </form>
          <LuSettings2 className="text-3xl shrink-0" />
        </div>
      </div>

      <form className="relative block lg:hidden w-full place-self-end">
        <input
          type="text"
          placeholder="Cari Produk"
          className="rounded-full border-2 border-slate-400 py-2 px-5 w-full"
        />
        <button className="bg-slate-950 absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full">
          <CiSearch className="text-white text-2xl" />
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
