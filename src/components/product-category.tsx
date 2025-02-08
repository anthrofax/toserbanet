import { BsBookshelf } from "react-icons/bs"; // Furnitur
import { IoShirtSharp } from "react-icons/io5"; // Fashion
import { GiRunningShoe } from "react-icons/gi"; // Shoe
import { MdOutlineMonitor } from "react-icons/md"; // Elektronik
import { BsSmartwatch } from "react-icons/bs"; // Arloji
import { CiLaptop } from "react-icons/ci"; // Laptop
import { IoPhonePortraitOutline } from "react-icons/io5"; // Handphone
import { RiDiscountPercentLine } from "react-icons/ri"; // Promo
import Link from "next/link";

function ProductCategory() {
  return (
    <div className="flex gap-8 p-5 overflow-x-auto w-[80%] mx-auto scrollbar">
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <BsBookshelf className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Furnitur</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <IoShirtSharp className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Fashion</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <GiRunningShoe className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Sepatu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <MdOutlineMonitor className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Elektronik</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <BsSmartwatch className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Arloji</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <CiLaptop className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Laptop</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <IoPhonePortraitOutline className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Handphone</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href=""
          className="flex items-center justify-center rounded-full w-16 aspect-square shrink-0 border-2 border-slate-800"
        >
          <RiDiscountPercentLine className="w-1/2 h-1/2" />
        </Link>
        <span className="text-sm">Promo</span>
      </div>
    </div>
  );
}

export default ProductCategory;
