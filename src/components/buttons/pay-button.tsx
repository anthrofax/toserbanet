"use client";

import { PiMoneyLight } from "react-icons/pi";
import { Modal } from "../modal";
import PaymentPage from "../payment-page";
import { cn } from "@/utils/cn";
import PrimaryButton from "../primary-button";

function PayButton({
  orderId,
  buttonText,
  className,
}: {
  orderId: string;
  buttonText?: string;
  className?: string;
}) {
  return (
    <Modal>
      <Modal.Open>
        {
          <PrimaryButton
            className={
              className
            }
          >
            {buttonText}
          </PrimaryButton>
        }
      </Modal.Open>
      <Modal.OpenedModal
        modalTitle="Pembayaran Pesanan"
        modalIcon={<PiMoneyLight className="text-2xl md:text-3xl shrink-0" />}
      >
        <PaymentPage orderId={orderId} />
      </Modal.OpenedModal>
    </Modal>
  );
}

export default PayButton;
