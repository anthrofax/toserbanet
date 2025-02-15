"use client";

import { MouseEvent, useEffect, useRef } from "react";

export function useOutsideClick(handleClose: () => void, handleCapture = true) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOverlay(e: MouseEvent<HTMLDivElement>) {
      if (modal.current && !modal.current.contains(e.target as Node)) {
        if (
          (e.target as HTMLElement).tagName.toLowerCase() === "html" ||
          (e.target as HTMLElement).closest(".Toastify__toast") ||
          (e.target as HTMLElement).closest(".confirmation-box")
        )
          return;
        handleClose();
      }
    }
    const listener: EventListener =
      handleClickOverlay as unknown as EventListener;
    document.addEventListener("click", listener, handleCapture);

    return () => {
      document.removeEventListener("click", listener, handleCapture);
    };
  }, [handleCapture, handleClose]);

  return modal;
}
