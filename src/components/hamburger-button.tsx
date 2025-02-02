"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { LuGlasses } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";
import { useWixClientContext } from "@/contexts/wix-context";

function HamburgerButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const wixClient = useWixClientContext();
  const isLoggedIn = wixClient.auth.loggedIn();

  function handleToggle() {
    setIsOpen((val) => !val);
  }

  return (
    <>
      <button
        className={`transition-all space-y-1 w-6 aspect-square relative lg:hidden`}
        onClick={handleToggle}
      >
        <div
          className={`transition-all h-1 w-full rounded-full bg-slate-700 ${
            isOpen
              ? "absolute -left-0 bottom-1/2 translate-y-1/2 -rotate-45"
              : ""
          }`}
        />
        <div
          className={`transition-all h-1 rounded-full bg-slate-700 ${
            isOpen ? "w-0" : "w-full"
          }`}
        />
        <div
          className={`transition-all h-1 w-full rounded-full bg-slate-700 ${
            isOpen
              ? "absolute -right-0 bottom-1/2 translate-y-1/2 rotate-45"
              : ""
          }`}
        />
      </button>
      {typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className={`delay-100 fixed left-0 top-0 right-0 bottom-0 z-20 bg-slate-700/30 cursor-pointer lg:hidden ${
                isOpen ? "" : "hidden w-max"
              }  `}
              onClick={() => setIsOpen(false)}
            />
            <div
              className={`duration-500 ease-out delay-100 fixed bg-slate-50 w-52 h-screen lg:hidden ${
                isOpen ? "translate-x-0" : "translate-x-96"
              } right-0 z-30 rounded-l-lg py-16 space-y-3`}
            >
              <IoClose
                className="absolute top-3 left-3 text-3xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />

              {isLoggedIn ? (
                <LogoutButton className="p-3 w-full flex justify-center items-center gap-2" />
              ) : (
                <LoginButton className="p-3 w-full flex items-center justify-center gap-2" />
              )}

              <ul className="flex flex-col gap-2 text-slate-700  px-2.5">
                <Link
                  className={`w-full p-5 ${
                    pathname === "/" ? "bg-slate-200" : "bg-slate-100"
                  } transition-all hover:bg-slate-200 flex gap-2 items-center`}
                  href={"/"}
                  onClick={() => setIsOpen(false)}
                >
                  <RiHome6Line /> Home
                </Link>
                <Link
                  className={`w-full p-5 ${
                    pathname === "/products" ? "bg-slate-200" : "bg-slate-100"
                  } transition-all hover:bg-slate-200 flex gap-2 items-center`}
                  href={"/products"}
                  onClick={() => setIsOpen(false)}
                >
                  <LuGlasses /> Product
                </Link>
                <Link
                  className={`w-full p-5 ${
                    pathname === "/kontak" ? "bg-slate-200" : "bg-slate-100"
                  } transition-all hover:bg-slate-200 flex gap-2 items-center`}
                  href={"/kontak"}
                  onClick={() => setIsOpen(false)}
                >
                  <BiPhoneCall /> Kontak
                </Link>
              </ul>
            </div>
          </>,
          window.document.body
        )}
    </>
  );
}

export default HamburgerButton;
