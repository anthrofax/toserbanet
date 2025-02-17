"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { getBuktiPembayaranById } from "@/lib/order";
import PrimaryButton from "./primary-button";
import { ModalContext } from "./modal";
import Loader from "./loader";
import { useGetRekingBank } from "@/hooks/useRekeningBank";

function PaymentPage({ orderId }: { orderId: string }) {
  const [namaFotoBuktiTf, setNamaFotoBuktiTf] = useState<string | null>(null);
  const [linkFotoBuktiPembayaran, setLinkFotoBuktiPembayaran] = useState<
    string | null
  >(null);
  const { mutatePaymentEvidence, mutatePaymentEvidencePending } =
    useMutatePaymentEvidence();
  const wixClient = useWixClientContext();
  const { isOpen } = useContext(ModalContext);
  const { rekeningBank, getRekeningBankLoading } = useGetRekingBank(isOpen);

  const { data: orderData, isLoading } = useQuery({
    queryKey: [orderId, "currentOrder"],
    queryFn: async () => {
      const buktiPembayaran = await wixClient.orders.getOrder(orderId);

      return buktiPembayaran;
    },
    enabled: isOpen,
  });

  const { data: buktiPembayaran, isLoading: getBuktiPembayaranLoading } =
    useQuery({
      queryKey: [orderId, "buktiPembayaran"],
      queryFn: async () => {
        try {
          const buktiPembayaran = await getBuktiPembayaranById(orderId);

          console.log(buktiPembayaran);

          if (
            !buktiPembayaran ||
            !buktiPembayaran.namaFoto ||
            !buktiPembayaran.linkBuktiPembayaran
          )
            return null;

          return buktiPembayaran;
        } catch (err) {
          console.log(err);

          return null;
        }
      },
      staleTime: 0,
      enabled: isOpen,
    });

  useEffect(() => {
    if (
      buktiPembayaran &&
      buktiPembayaran?.namaFoto &&
      buktiPembayaran?.linkBuktiPembayaran
    ) {
      setNamaFotoBuktiTf(buktiPembayaran.namaFoto);
      setLinkFotoBuktiPembayaran(buktiPembayaran.linkBuktiPembayaran);
    } else {
      setNamaFotoBuktiTf(null);
      setLinkFotoBuktiPembayaran(null);
    }
  }, [buktiPembayaran, isOpen]);

  useEffect(() => {
    if (!isOpen) setNamaFotoBuktiTf(null);
  }, [isOpen]);

  const handlePhotoChange = async (result: CloudinaryUploadWidgetResults) => {
    console.log(result);
    if (typeof result.info !== "object")
      return toast.error("Tidak ada gambar yang diunggah");

    const linkFotoBuktiPembayaran = result.info.url;
    const namaFoto = result.info.original_filename + "." + result.info.format;

    console.log("PhotoUrl", linkFotoBuktiPembayaran);
    console.log("PhotoName", namaFoto);

    if (!!linkFotoBuktiPembayaran && !!namaFoto) {
      setNamaFotoBuktiTf(namaFoto);
      setLinkFotoBuktiPembayaran(linkFotoBuktiPembayaran);
    }
  };

  async function handleSavePaymentEvidence(
    orderId: string,
    linkFotoBuktiPembayaran: string,
    namaFoto: string
  ) {
    try {
      await mutatePaymentEvidence({
        orderId,
        linkFotoBuktiPembayaran,
        namaFoto,
      });

      toast.success("Bukti pembayaran berhasil dikirim");
    } catch (error) {
      console.log(error);
      toast.error("Terdapat kesalahan saat mengirim bukti pembayaran");
    }
  }

  return (
    <div className="mt-3 space-y-3 w-full min-h-72 relative">
      {getBuktiPembayaranLoading ? (
        <Loader className="h-full" />
      ) : (
        <>
          <div className="flex flex-col gap-3 max-h-52 overflow-y-auto scrollbar pr-1">
            {getRekeningBankLoading ? (
              Array.from({ length: 4 }).map((_, i) => {
                return (
                  <div
                    className="shrink-0 grid grid-cols-8 items-center gap-y-2 bg-slate-200/50 rounded-lg p-3 shadow-md"
                    key={i}
                  >
                    <Skeleton className="w-12 rounded-full aspect-square row-span-3 col-span-2 place-self-center bg-slate-300/50" />

                    <Skeleton className="col-span-5 h-4 bg-slate-300/50 shrink-0" />
                    <Skeleton className="col-span-5 h-4 bg-slate-300/50 shrink-0" />
                    <Skeleton className="col-span-5 h-4 bg-slate-300/50 shrink-0" />
                  </div>
                );
              })
            ) : !rekeningBank || rekeningBank.length < 1 ? (
              <p>Rekening sedang tidak tersedia.</p>
            ) : (
              rekeningBank.map((rekeningItem: any, i) => {
                return (
                  <div
                    className="shrink-0 grid grid-cols-8 items-center gap-x-1 bg-slate-200/50 rounded-lg p-3 shadow-md"
                    key={i}
                  >
                    <Image
                      width={0}
                      height={0}
                      className="row-span-3 col-span-2 place-self-center rounded-full border-2 border-slate-500 w-12 aspect-square"
                      src={rekeningItem?.gambarBank || "/broken-image.png"}
                      alt=""
                      sizes="33vw"
                    />
                    <p className="col-span-5">{rekeningItem?.jenisBank}</p>
                    <div className="col-span-5 flex gap-2 items-center">
                      <p className="font-semibold text-sm">
                        {rekeningItem?.nomorRekening}
                      </p>
                      <CopyButton
                        copyObject={`Rekening ${rekeningItem?.jenisBank}`}
                        text={`${rekeningItem?.nomorRekening}`}
                      />
                    </div>
                    <p className="col-span-5 font-semibold text-sm">
                      an. {rekeningItem?.namaPenerima}
                    </p>
                  </div>
                );
              })
            )}
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
                    <CopyButton
                      text={"12500999"}
                      copyObject="Nominal Transfer"
                    />
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
            onSuccess={handlePhotoChange}
            options={{
              maxFiles: 1,
              cropping: true,
              resourceType: "image",
              clientAllowedFormats: ["pdf", "png", "jpg"],
            }}
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

          {!!buktiPembayaran?.namaFoto &&
          !!buktiPembayaran?.linkBuktiPembayaran ? (
            <p className="text-slate-500 text-xs font-semibold">
              Bukti pembayaran anda sudah terkirim. Mohon tunggu hingga proses
              review selesai. Status pembayaran pesanan anda akan berubah begitu
              bukti pembayaran anda dinyatakan valid.
            </p>
          ) : (
            ""
          )}

          <PrimaryButton
            className="w-full rounded-lg disabled:cursor-not-allowed relative"
            disabled={
              !namaFotoBuktiTf ||
              !linkFotoBuktiPembayaran ||
              mutatePaymentEvidencePending
            }
            onClick={() => {
              if (!linkFotoBuktiPembayaran || !namaFotoBuktiTf)
                return toast.error(
                  "Anda belum mengunggah bukti pembayaran, silahkan unggah terlebih dahulu sebelum kirim"
                );

              if (
                namaFotoBuktiTf === buktiPembayaran?.namaFoto ||
                linkFotoBuktiPembayaran === buktiPembayaran?.linkBuktiPembayaran
              ) {
                return toast.error(
                  "Mohon untuk mengunggah gambar yang berbeda"
                );
              }

              handleSavePaymentEvidence(
                orderId,
                linkFotoBuktiPembayaran,
                namaFotoBuktiTf
              );
            }}
          >
            {mutatePaymentEvidencePending ? (
              <div className="loader-white w-[25px]"></div>
            ) : !buktiPembayaran?.namaFoto ||
              !buktiPembayaran?.linkBuktiPembayaran ? (
              "Kirim"
            ) : (
              "Upload ulang"
            )}
          </PrimaryButton>
        </>
      )}
    </div>
  );
}

export default PaymentPage;
