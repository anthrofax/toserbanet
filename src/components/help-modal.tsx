"use client";

import { useParams } from "next/navigation";

function HelpModal() {
  const params = useParams();

  if (!params?.orderId) return null;

  return (
    <div className="sticky lg:hidden bottom-0 p-3 shadow-sm z-30 bg-slate-50 w-[100vw]">
      <button className="w-full p-2 text-lg text-slate-500 border-2 border-slate-400 rounded-lg font-semibold">
        Bantuan
      </button>
    </div>
  );
}

export default HelpModal;
