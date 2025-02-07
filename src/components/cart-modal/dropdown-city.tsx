import { use, useEffect, useState } from "react";

function DropdownCity({
  value,
  onChange,
  provinsi,
  city
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  provinsi: string;
  city: string[]
}) {

  return (
    <div className="relative col-span-4">
      <select
        className={`w-full bg-transparent border-2 border-slate-300 pl-4 py-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
          value ? "pt-5" : "pt-3"
        } ${!provinsi ? "cursor-not-allowed" : ""}`}
        id="kota"
        value={value}
        onChange={onChange}
        disabled={!provinsi} // Disable if provinsi is not selected
      >
        <option value="" disabled>
          Pilih Kota
        </option>
        {city.map((cityItem) => (
          <option key={cityItem} value={cityItem}>
            {cityItem}
          </option>
        ))}
      </select>
      <label
        htmlFor="kota"
        className={`absolute transition-all duration-200 text-slate-400 ${
          value ? "text-xs top-1.5 left-4" : "hidden"
        }`}
      >
        Pilih Kota
      </label>
    </div>
  );
}

export default DropdownCity;
