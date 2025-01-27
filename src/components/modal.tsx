"use client";

import { cn } from "@/utils/cn";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
});

function Modal({
  children,
  isOpen,
  handleOpen,
  handleClose,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
}) {
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  handleOpen = handleOpen || (() => setIsOpenStatus(true));
  handleClose = handleClose || (() => setIsOpenStatus(false));

  return (
    <ModalContext
      value={{ isOpen: isOpen || isOpenStatus, handleOpen, handleClose }}
    >
      {children}
    </ModalContext>
  );
}

function Button({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { handleOpen } = useContext(ModalContext);
  return (
    <div
      onClick={handleOpen}
      className={cn("min-w-8 rounded-lg relative cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

function OpenedModal({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const { isOpen } = useContext(ModalContext);

  return createPortal(
    <div
      className={cn(
        `overflow-hidden p-3 bg-slate-50 shadow min-w-8 rounded-lg absolute top-[103%] right-0 delay-75 ease-out transition-all ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 -z-10"
        }`,
        className
      )}
      {...props}
    >
      {children}
    </div>,
    window.document.body
  );
}

Modal.Button = Button;
Modal.OpenedModal = OpenedModal;

export default Modal;
