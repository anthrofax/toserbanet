"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const wixClient = useWixClientContext();

  const { data, isLoading } = useQuery({
    queryKey: ["kategori"],
    queryFn: () => wixClient.collections.queryCollections().find(),
  });


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
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] shrink-0"
          onChange={handleChange}
        >
          <option value="">Category</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

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
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
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
