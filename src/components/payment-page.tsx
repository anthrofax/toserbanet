"use client";

import React, { useState } from "react";
import CopyButton from "@/components/copy-button";
import { rupiahFormatter } from "@/utils/number-formatter";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useMutatePaymentEvidence } from "@/hooks/useMutatePaymentEvidence";
import { toast } from "react-toastify";
import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

function PaymentPage({ orderId }: { orderId: string }) {
  const [namaFotoBuktiTf, setNamaFotoBuktiTf] = useState<string | null>(null);
  const { mutatePaymentEvidence } = useMutatePaymentEvidence();
  const wixClient = useWixClientContext();

  const { data: orderData, isLoading } = useQuery({
    queryKey: ["currentorder", orderId],
    queryFn: async () => {
      const buktiPembayaran = await wixClient.orders.getOrder(orderId);

      return buktiPembayaran;
    },
  });

  const handlePhotoChange = async (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info !== "object")
      return toast.error("Tidak ada gambar yang diunggah");

    const photoUrl = result.info.url;
    console.log('PhotoUrl', photoUrl)
    await mutatePaymentEvidence({
      orderId,
      linkFotoBuktiPembayaran: photoUrl,
    });

    const photoName = result.info.original_filename + "." + result.info.format;
    setNamaFotoBuktiTf(photoName);
  };

  return (
    <div className="mt-3 space-y-3">
      <div className="flex flex-col gap-3 max-h-52 overflow-y-auto scrollbar pr-1">
        <div className="shrink-0 grid grid-cols-8 items-center gap-x-1 bg-slate-200/50 rounded-lg p-3 shadow-md">
          <Image
            width={0}
            height={0}
            className="row-span-3 col-span-2 place-self-center rounded-full border-2 border-slate-500 w-12 aspect-square"
            src={"/bca.png"}
            alt=""
            sizes="33vw"
          />
          <p className="col-span-5">BCA</p>
          <div className="col-span-5 flex gap-2 items-center">
            <p className="font-semibold text-sm">21220111010</p>
            <CopyButton copyObject="Rekening BCA" text={"21220111010"} />
          </div>
          <p className="col-span-5 font-semibold text-sm">an. Afridho Ikhsan</p>
        </div>
        <div className="shrink-0 grid grid-cols-8 items-center gap-x-1 bg-slate-200/50 rounded-lg p-3 shadow-md">
          <Image
            width={0}
            height={0}
            className="row-span-3 col-span-2 place-self-center rounded-full border-2 border-slate-500 w-12 aspect-square"
            src={"/bni.png"}
            alt=""
            sizes="33vw"
          />
          <p className="col-span-5">BNI</p>
          <div className="col-span-5 flex gap-2 items-center">
            <p className="font-semibold text-sm">21220111010</p>
            <CopyButton copyObject="Rekening BNI" text={"21220111010"} />
          </div>
          <p className="col-span-5 font-semibold text-sm">an. Ahmad Safuan</p>
        </div>
        <div className="shrink-0 grid grid-cols-8 items-center gap-x-1 bg-slate-200/50 rounded-lg p-3 shadow-md">
          <Image
            width={0}
            height={0}
            className="row-span-3 col-span-2 place-self-center rounded-full border-2 border-slate-500 w-12 aspect-square"
            src={"/mandiri.png"}
            alt=""
            sizes="33vw"
          />
          <p className="col-span-5">Mandiri</p>
          <div className="col-span-5 flex gap-2 items-center">
            <p className="font-semibold text-sm">21220111010</p>
            <CopyButton copyObject="Rekening Mandiri" text={"21220111010"} />
          </div>
          <p className="col-span-5 font-semibold text-sm">an. Ahmad Safuan</p>
        </div>
        <div className="shrink-0 grid grid-cols-8 items-center gap-x-1 bg-slate-200/50 rounded-lg p-3 shadow-md">
          <Image
            width={0}
            height={0}
            className="row-span-3 col-span-2 place-self-center rounded-full border-2 border-slate-500 w-12 aspect-square"
            src={"/bri.png"}
            alt=""
            sizes="33vw"
          />
          <p className="col-span-5">BRI</p>
          <div className="col-span-5 flex gap-2 items-center">
            <p className="font-semibold text-sm">21220111010</p>
            <CopyButton copyObject="Rekening BRI" text={"21220111010"} />
          </div>
          <p className="col-span-5 font-semibold text-sm">an. Ahmad Safuan</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center">
            Total:{" "}
            {isLoading ? (
              <Skeleton className="w-16 h-4 bg-slate-300/50 shrink-0" />
            ) : (
              <div className="flex gap-1 items-center">
                <span className="text-green-700">
                  {rupiahFormatter.format(
                    Number(orderData?.priceSummary?.total?.amount) || 0
                  )}
                </span>
                <CopyButton text={"12500999"} copyObject="Nominal Transfer" />
              </div>
            )}
          </div>
        </div>
        <p className="text-xs font-semibold">
          Pastikan nominal transfer sesuai dengan yang tertera di atas
        </p>
      </div>

      <CldUploadButton
        className="flex flex-col justify-center items-center p-16 border-2 border-dashed border-slate-700 rounded-lg bg-slate-200 cursor-pointer w-full"
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET!}
        onSourceChanged={handlePhotoChange}
        onSuccess={handlePhotoChange}
        options={{ maxFiles: 1, cropping: true }}
      >
        <p>
          {namaFotoBuktiTf && namaFotoBuktiTf !== ""
            ? namaFotoBuktiTf
            : "Upload Bukti Transfer"}
        </p>
        {namaFotoBuktiTf && namaFotoBuktiTf !== "" && (
          <p className="underline">Upload ulang bukti transfer</p>
        )}
      </CldUploadButton>
    </div>
  );
}

export default PaymentPage;
