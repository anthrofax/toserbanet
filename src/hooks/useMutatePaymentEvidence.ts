"use client";

import { addBuktiPembayaran, updateBuktiPembayaran } from "@/lib/order";
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
      namaFoto,
    }: {
      orderId: string;
      linkFotoBuktiPembayaran: string;
      namaFoto: string
    }) => {
      // await updateBuktiPembayaran(orderId, linkFotoBuktiPembayaran);
      await addBuktiPembayaran(orderId, linkFotoBuktiPembayaran, namaFoto);
    },
  });

  return { mutatePaymentEvidence, mutatePaymentEvidencePending };
}
