"use client";

import { MouseEvent, useEffect, useRef } from "react";

export function useOutsideClick(handleClose: () => void, handleCapture = true) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fungsi event handler dengan tipe MouseEvent dasar
    function handleClickOverlay(e: MouseEvent<HTMLDivElement>) {
      // Pastikan e.target adalah elemen DOM yang valid
      if (modal.current && !modal.current.contains(e.target as Node)) {
        handleClose();
      }
    }

    // Type assertion untuk memastikan bahwa event handler valid sebagai EventListener
    const listener: EventListener =
      handleClickOverlay as unknown as EventListener;
    document.addEventListener("click", listener, handleCapture);

    return () => {
      document.removeEventListener("click", listener, handleCapture);
    };
  }, [handleCapture, handleClose]);

  return modal;
}
