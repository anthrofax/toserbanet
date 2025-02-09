"use client";

import { createPortal } from "react-dom";

function HelpModal() {
  return createPortal(
    <div className="fixed bottom-0 p-3 shadow-sm z-30 bg-slate-50 w-[100vw]">
      <button className="w-full p-2 text-lg text-slate-500 border-2 border-slate-400 rounded-lg font-semibold">Bantuan</button>
    </div>,
    document.body
  );
}

export default HelpModal;
