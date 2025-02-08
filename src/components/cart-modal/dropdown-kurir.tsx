import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/hooks/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { getOngkir } from "@/actions";

function DropdownKurir({
  kurir,
  kodePosTujuan,
  ongkir,
  onChangeKurir,
  onChangeLayananKurir,
  isDisabled = false,
}: {
  kurir: string;
  kodePosTujuan: string;
  ongkir: number;
  onChangeKurir: (e: string) => void;
  onChangeLayananKurir: (e: string) => void;
  isDisabled?: boolean;
}) {
  const { cart } = useCartStore();
  const [isLayananKurirModalOpen, setIsLayananKurirModalOpen] = useState(false);

  const productsWeight = cart.lineItems.reduce((acc, cur) => {
    if (!cur.physicalProperties || !cur.physicalProperties.weight)
      return acc + 0;

    return acc + cur.physicalProperties.weight * 1000;
  }, 0);

  const { data: daftarLayananKurir, isLoading } = useQuery({
    queryKey: ["layananKurir", kurir],
    queryFn: async () => {
      const layananKurir = await getOngkir({
        destination: kodePosTujuan,
        weight: productsWeight,
        courier: kurir,
        price: "lowest",
      });

      if ("error" in layananKurir) return [];

      return layananKurir;
    },
    enabled: isLayananKurirModalOpen,
  });

  return (
    <>
      <div className="relative col-span-8">
        <Select disabled={isDisabled} onValueChange={onChangeKurir}>
          <SelectTrigger
            className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-4 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
              kurir ? "pt-8" : "pt-4"
            } ${isDisabled ? "cursor-not-allowed" : ""}`}
            id="kurir"
            value={kurir}
            disabled={isDisabled}
          >
            <SelectValue placeholder="Pilih Kurir" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Opsi Kurir</SelectLabel>
              <SelectItem value="jne">JNE</SelectItem>
              <SelectItem value="jnt">J&T</SelectItem>
              <SelectItem value="sicepat">SICEPAT</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <label
          htmlFor="kurir"
          className={`absolute transition-all duration-200 text-slate-400 ${
            kurir ? "text-xs top-1.5 left-4" : "hidden"
          }`}
        >
          Pilih Kurir
        </label>
      </div>
      <div className="relative col-span-8">
        <Select
          open={isLayananKurirModalOpen}
          onOpenChange={setIsLayananKurirModalOpen}
          disabled={isDisabled}
          onValueChange={onChangeLayananKurir}
        >
          <SelectTrigger
            className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-4 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
              ongkir !== 0 ? "pt-8" : "pt-4"
            } ${isDisabled ? "cursor-not-allowed" : ""}`}
            id="kurir"
            value={ongkir}
            disabled={isDisabled}
          >
            <SelectValue placeholder={`Pilih Layanan Kurir`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Opsi Layanan Kurir</SelectLabel>
              {isLoading ? (
                <SelectItem value="loading ">Memuat...</SelectItem>
              ) : (
                daftarLayananKurir &&
                daftarLayananKurir.map((layanan, i) => {
                  return (
                    <SelectItem key={i} value={String(layanan.cost)}>
                      {`${layanan.name} - ${layanan.service} - ${layanan.cost}`}
                    </SelectItem>
                  );
                })
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <label
          htmlFor="kurir"
          className={`absolute transition-all duration-200 text-slate-400 ${
            ongkir ? "text-xs top-1.5 left-4" : "hidden"
          }`}
        >
          Pilih Layanan Kurir
        </label>
      </div>
    </>
  );
}

export default DropdownKurir;
