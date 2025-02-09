import HelpModal from "@/components/help-modal";
import { createPortal } from "react-dom";

function OrderDetailPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <HelpModal />
    </>
  );
}

export default OrderDetailPageLayout;
