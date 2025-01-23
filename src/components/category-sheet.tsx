"use client";

import { LuSettings2 } from "react-icons/lu";
import Sheet from "./sheet";
import Link from "next/link";
import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { useCategorySheetStore } from "@/hooks/useCategorySheetStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function CategorySheet() {
  const wixClient = useWixClientContext();
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(function () {
    setCurrentCategory(new URLSearchParams(searchParams).get("cat") || "");
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["kategori"],
    queryFn: () => wixClient.collections.queryCollections().find(),
  });

  const { isOpen, closeSheet, toggleCategorySheet } = useCategorySheetStore();

  return (
    <Sheet
      button={<LuSettings2 className="text-3xl shrink-0" />}
      title="Kategori"
      description="Pilih kategori produk spesifik yang ingin anda cari."
      className="w-[300px] rounded-r-lg"
      open={isOpen}
      onOpenChange={toggleCategorySheet}
    >
      <div className="mt-3 flex flex-col gap-2 items-center py-3 pr-3 overflow-y-auto h-[90%] scrollbar">
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                className="w-full h-8 bg-slate-300/50 shrink-0"
                key={i}
              />
            ))
          : data?.items.map((cat) => (
              <Link
                className={`${
                  currentCategory === cat.slug ? "bg-slate-300" : "bg-slate-200"
                } w-full text-base p-3 rounded-lg shrink-0`}
                href={`/products?cat=${cat.slug || ""}`}
                key={cat._id}
                onClick={closeSheet}
              >
                {cat.name}
              </Link>
            ))}
      </div>
    </Sheet>
  );
}

export default CategorySheet;
