"use client";

import { updateBuktiPembayaran } from "@/lib/order";
import { useMutation } from "@tanstack/react-query";

export function useMutatePaymentEvidence() {
  const {
    mutateAsync: mutatePaymentEvidence,
    isPending: mutatePaymentEvidencePending,
  } = useMutation({
    mutationKey: ["fotoBuktiPembayaran"],
    mutationFn: async ({
      orderId,
      linkFotoBuktiPembayaran,
    }: {
      orderId: string;
      linkFotoBuktiPembayaran: string;
    }) => {
      // await updateBuktiPembayaran(orderId, linkFotoBuktiPembayaran);
    },
  });

  return { mutatePaymentEvidence, mutatePaymentEvidencePending };
}
