import React from "react";

interface DropdownDistrictProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  kota: string;
  kecamatan: string[];
}

function DropdownDistrict({
  value,
  onChange,
  kota,
  kecamatan,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  kota: string;
  kecamatan: string[];
}) {
  return (
    <div className="relative col-span-4">
      <select
        className={`w-full bg-transparent border-2 border-slate-300 pl-4 py-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
          value ? "pt-5" : "pt-3"
        } ${!kota ? "cursor-not-allowed" : ""}`}
        id="district"
        value={value}
        onChange={onChange}
        disabled={!kota}
      >
        <option value="" disabled>
          Pilih Kecamatan
        </option>
        {kecamatan.map((kecItem, index) => (
          <option key={index} value={kecItem}>
            {kecItem}
          </option>
        ))}
      </select>
      <label
        htmlFor="district"
        className={`absolute transition-all duration-200 text-slate-400 ${
          value ? "text-xs top-1.5 left-4" : "hidden"
        }`}
      >
        Pilih Kecamatan
      </label>
    </div>
  );
}

export default DropdownDistrict;
