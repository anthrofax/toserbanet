import Link from "next/link";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <aside className="rounded-r-lg bg-slate-50/50 flex flex-col justify-between items-center w-1/5">
        <div className="flex flex-col gap-2 items-center">
          <Link href={""}>User</Link>
          <Link href={""}>Transaksi</Link>
        </div>
        <Link href={""}>Logout</Link>
        <div className="w-4/5">{children}</div>
      </aside>
    </div>
  );
}

export default UserLayout;
