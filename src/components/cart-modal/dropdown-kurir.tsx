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
import { getOngkir, getRajaOngkirLocationsData } from "@/actions";

function DropdownKurir({
  kurir,
  kecamatan,
  ongkir,
  onChangeKurir,
  onChangeLayananKurir,
  isDisabled = false,
}: {
  kurir: string;
  kecamatan: string;
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
      const districtId = await getRajaOngkirLocationsData(kecamatan);

      console.log(districtId.data);

      if (!districtId || !districtId.data) return null;

      const layananKurir = await getOngkir({
        destination: String(districtId.data),
        weight: productsWeight,
        courier: kurir,
        price: "lowest",
      });

      console.log(layananKurir);

      if ("error" in layananKurir) return [];

      return layananKurir;
    },
    enabled: isLayananKurirModalOpen,
  });

  return (
    <>
      <div className="relative col-span-4">
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
          disabled={kurir === ""}
          onValueChange={onChangeLayananKurir}
        >
          <SelectTrigger
            className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-4 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
              ongkir !== 0 ? "pt-8" : "pt-4"
            } ${kurir === "" ? "cursor-not-allowed" : ""}`}
            id="kurir"
            value={ongkir}
            disabled={kurir === ""}
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
                    <SelectItem
                      key={i}
                      value={`${layanan.name} | ${layanan.description} | ${layanan.cost}`}
                    >
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
