import React, { useEffect, useState } from "react";
import { useGetPostcodesByDistrict } from "../../utils/location-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownPostcodeProps {
  value: string;
  onChange: (e: string) => void;
  district: string;
}

function DropdownPostcode({
  value,
  onChange,
  district,
}: DropdownPostcodeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, kodePos } = useGetPostcodesByDistrict(
    district,
    isModalOpen
  );

  return (
    <div className="relative col-span-4">
      <Select
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onValueChange={onChange}
        disabled={district === ""}
      >
        <SelectTrigger
          className={`w-full h-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
            value ? "pt-6" : "pt-3"
          } ${district === "" ? "cursor-not-allowed" : "cursor-pointer"}`}
          id="provinsi"
          value={value}
        >
          <SelectValue placeholder="Pilih Kode Pos" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Provinsi</SelectLabel>
            {isLoading ? (
              <SelectItem value="loading ">Memuat...</SelectItem>
            ) : (
              kodePos.map((kodePos, i) => (
                <SelectItem key={i} value={kodePos}>
                  {kodePos}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <label
        htmlFor="postcode"
        className={`absolute transition-all duration-200 text-slate-400 ${
          value ? "text-xs top-1.5 left-4" : "hidden"
        }`}
      >
        Pilih Kode Pos
      </label>
    </div>
  );
}

export default DropdownPostcode;
