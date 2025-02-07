import React from "react";

interface DropdownKurirProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  provinsi: string;
  kota: string;
  kecamatan: string;
}

function DropdownKurir({
  value,
  onChange,
  provinsi,
  kota,
  kecamatan,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  provinsi: string;
  kota: string;
  kecamatan: string;
}) {
  const isDisabled = !provinsi || !kota || !kecamatan;

  return (
    <div className="relative col-span-4">
      <select
        className={`w-full bg-transparent border-2 border-slate-300 pl-4 py-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
          value ? "pt-5" : "pt-3"
        } ${isDisabled ? "cursor-not-allowed" : ""}`}
        id="kurir"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      >
        <option value="" disabled>
          Pilih Kurir
        </option>
        {/* Add options dynamically or statically */}
        <option value="jne">JNE</option>
        <option value="jnt">JNE</option>
        <option value="sicepat">SICEPAT</option>
      </select>
      <label
        htmlFor="kurir"
        className={`absolute transition-all duration-200 text-slate-400 ${
          value ? "text-xs top-1.5 left-4" : "hidden"
        }`}
      >
        Pilih Kurir
      </label>
    </div>
  );
}

export default DropdownKurir;
