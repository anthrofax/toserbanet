'use client'

import { cn } from "@/utils/cn";
import { handleCopy } from "@/utils/handle-copy";
import { MdOutlineContentCopy } from "react-icons/md";

function CopyButton({
  className,
  text,
  copyObject,
}: {
  text: string | undefined | null;
  copyObject: string;
  className?: string;
}) {
  return (
    <button
      className={cn("flex justify-between items-center", className)}
      onClick={() => {
        handleCopy(text, copyObject);
      }}
    >
      <MdOutlineContentCopy className="flex-shrink-0" />
    </button>
  );
}

export default CopyButton;
