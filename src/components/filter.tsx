"use client";

import { IoIosArrowDown } from "react-icons/io";
import { useCategorySheetStore } from "@/hooks/useCategorySheetStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { toggleCategorySheet } = useCategorySheetStore();

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-12 flex flex-col md:flex-row items-center md:justify-between gap-3">
      <div className="flex justify-center md:justify-start gap-6 flex-wrap">
        <button
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-200 shrink-0 flex gap-2 items-center transition-colors hover:bg-slate-300 text-slate-700"
          onClick={toggleCategorySheet}
        >
          Category <IoIosArrowDown className="text-xl" />
        </button>

        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 h-8 ring-1 ring-gray-400 shrink-0"
          onChange={handleChange}
        />

        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 h-8 ring-1 ring-gray-400 shrink-0"
          onChange={handleChange}
        />
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-slate-200 transition-colors hover:bg-slate-300 text-slate-700 cursor-pointer"
          onChange={handleChange}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
