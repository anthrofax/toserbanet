// "use client";

// import { useOutsideClick } from "@/hooks/useOutsideClick";
// import React, {
//   cloneElement,
//   createContext,
//   Dispatch,
//   JSXElementConstructor,
//   ReactElement,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";

// interface ModalContextType {
//   openModalName: string;
//   handleClose: () => void;
//   setOpenModalName: Dispatch<SetStateAction<string>>;
// }

// const ModalContext = createContext<ModalContextType>({
//   setOpenModalName: () => {},
//   handleClose: () => {},
//   openModalName: "",
// });

// function Modal({ children }: { children: React.ReactNode }) {
//   const [openModalName, setOpenModalName] = useState("");

//   const handleClose = function () {
//     setOpenModalName("");
//   };

//   return (
//     <ModalContext value={{ openModalName, handleClose, setOpenModalName }}>
//       {children}
//     </ModalContext>
//   );
// }

// function Open({
//   children,
//   opens,
// }: {
//   children: React.ReactNode;
//   opens: string;
// }) {
//   const { setOpenModalName } = useContext(ModalContext);

//   return cloneElement(
//     children as ReactElement<unknown, string | JSXElementConstructor<any>>,
//     { onClick: () => setOpenModalName(opens) }
//   );
// }

// function Window({
//   children,
//   name,
// }: {
//   children: React.ReactNode;
//   name: string;
// }) {
//   const { openModalName, handleClose } = useContext(ModalContext);

//   const modal = useOutsideClick(handleClose);

//   if (openModalName !== name) return null;

//   return createPortal(
//     <Overlay /*onClick={handleClose}*/>
//       <StyledModal ref={modal} /*onClick={(e) => e.stopPropagation()} */>
//         <StyledButton onClick={handleClose}>
//           <HiXMark />
//         </StyledButton>
//         <div>{cloneElement(children, { onCloseModal: handleClose })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;
