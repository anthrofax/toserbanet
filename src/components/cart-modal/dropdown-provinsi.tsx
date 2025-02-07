import { useEffect, useState } from "react";

const provinces = [
  "Aceh",
  "Bali",
  "Banten",
  "Bengkulu",
  "Gorontalo",
  "DKI Jakarta",
  "Jambi",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Kalimantan Barat",
  "Kalimantan Selatan",
  "Kalimantan Tengah",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "Lampung",
  "Maluku",
  "Maluku Utara",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Papua",
  "Papua Barat",
  "Riau",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Sumatera Utara",
  "Yogyakarta",
];

const ProvinceSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative col-span-4">
    <select
      className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
        value ? "pt-5" : "pt-3"
      }`}
      id="provinsi"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Pilih Provinsi
      </option>
      {provinces.map((provinsi) => (
        <option key={provinsi} value={provinsi}>
          {provinsi}
        </option>
      ))}
    </select>
    <label
      htmlFor="provinsi"
      className={`absolute transition-all duration-200 text-slate-400 ${
        value ? "text-xs top-1.5 left-4" : "hidden"
      }`}
    >
      Pilih Provinsi
    </label>
  </div>
);

export default ProvinceSelect;
