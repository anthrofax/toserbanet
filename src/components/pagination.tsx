"use client";

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/utils/cn";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PropsType {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  className?: string;
}

function Pagination({ className, currentPage, hasNext, hasPrev }: PropsType) {
  return (
    <ShadPagination className={cn("", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            className={`${
              !hasPrev ? "pointer-events-none bg-blue-200" : "bg-blue-500"
            } text-slate-50 hover:bg-blue-400 hover:text-slate-50`}
          />
        </PaginationItem>
        {hasPrev && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className=" relative">
          <PaginationLink href="#">{currentPage}</PaginationLink>
          <div className="h-0.5 w-2/3 bg-blue-500 absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full" />
        </PaginationItem>
        {hasNext && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            className={`${
              !hasNext ? "pointer-events-none bg-blue-200" : "bg-blue-500"
            } text-slate-50 hover:bg-blue-400 hover:text-slate-50`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}

export default Pagination;
