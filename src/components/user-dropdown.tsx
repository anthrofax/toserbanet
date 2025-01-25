"use client";

import Dropdown from "./dropdown";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import LogoutButton from "./logout-button";
import { useState } from "react";

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function onToggle() {
    setIsOpen((val) => !val);
  }
  return (
    <Dropdown isOpen={isOpen} toggleFn={onToggle}>
      <Dropdown.Icon>
        <CiUser className="text-3xl font-bold cursor-pointer hidden lg:block" />
      </Dropdown.Icon>
      <Dropdown.OpenedModal className="hidden lg:flex flex-col divide-y-2 divide-slate-300 p-0">
        <Link
          href={``}
          className="flex items-center gap-1 p-3 transition-colors hover:bg-slate-200"
        >
          <CgProfile /> Profil
        </Link>
        <Link
          href={``}
          className="flex items-center gap-1 p-3 transition-colors hover:bg-slate-200"
        >
          <TbNotes /> Transaksi
        </Link>

        <LogoutButton onLogout={() => setIsOpen(false)} />
      </Dropdown.OpenedModal>
    </Dropdown>
  );
}

export default UserDropdown;
