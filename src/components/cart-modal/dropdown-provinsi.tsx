import { useGetProvinces } from "@/utils/location-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  useState } from "react";

const ProvinceSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { provinsi, isLoading } = useGetProvinces(isModalOpen);

  return (
    <div className="relative col-span-4">
      <Select
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={`w-full h-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-center outline-none rounded-lg text-sm focus:border-slate-500 ${
            value ? "pt-6" : "pt-3"
          }`}
          id="provinsi"
          value={value}
        >
          <SelectValue placeholder="Pilih Provinsi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Provinsi</SelectLabel>
            {isLoading ? (
              <SelectItem value="loading ">Memuat...</SelectItem>
            ) : (
              provinsi.map((provinsiItem) => (
                <SelectItem key={provinsiItem.id} value={provinsiItem.id}>
                  {provinsiItem.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <label
        htmlFor="provinsi"
        className={`absolute transition-all duration-200 text-slate-400 ${
          value !== "" ? "text-xs top-1.5 left-4" : "hidden"
        }`}
      >
        Pilih Provinsi
      </label>
    </div>
  );
};

export default ProvinceSelect;
