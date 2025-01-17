import {
  MdKeyboardDoubleArrowDown,
  MdOutlineNewReleases,
} from "react-icons/md";
import ProductItem from "./product-item";
import Link from "next/link";

function NewReleaseProduct() {
  return (
    <div className="py-5 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="bg-blue-600 flex gap-2 items-center justify-center rounded-r-full p-3 text-white w-max shrink-0 grow-0">
          <MdOutlineNewReleases className="text-xl" />
          Produk Terbaru
        </div>
        <hr className="flex-1 h-0.5 bg-slate-200" />
      </div>

      <div className="grid max-[400px]:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-x-2 md:gap-x-5 gap-y-5 container mx-auto px-2">
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
        <ProductItem className="w-full" />
      </div>

      <Link
        href=""
        className="border-2 text-slate-700 border-blue-500 rounded-full px-5 py-2 w-max flex items-center gap-2 text-md mx-auto my-5"
      >
        Produk Lainnya <MdKeyboardDoubleArrowDown />
      </Link>
    </div>
  );
}

export default NewReleaseProduct;
