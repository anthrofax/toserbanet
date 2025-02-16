import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 relative gap-x-2">
      <aside className="rounded-r-lg bg-slate-50/50 hidden lg:flex flex-col justify-between items-center shadow sticky top-0 col-span-2">
        <div className="w-full flex flex-col gap-2 items-center">
          <Link
            className={`w-full p-7 transition-all hover:bg-slate-200 flex gap-2 items-center`}
            href={`/user/${"hiprofax"}`}
          >
            <CgProfile className="text-xl" /> Profil
          </Link>
          <Link
            className={`w-full p-7 transition-all hover:bg-slate-200 flex gap-2 items-center`}
            href={`/user/${"hiprofax"}/transactions`}
          >
            <TbNotes className="text-xl" /> Transaksi
          </Link>
          <LogoutButton className="p-5 w-full" />
        </div>
      </aside>

      <div className="col-start-1 lg:col-start-3 col-span-12 lg:col-span-12 min-h-[80vh] relative">
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
