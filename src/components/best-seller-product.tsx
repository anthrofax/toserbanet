import { MdOutlineShowChart } from "react-icons/md";
import ProductItem from "./product-item";

function BestSellerProduct() {
  return (
    <div className="py-5 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="bg-blue-600 flex gap-2 items-center justify-center rounded-r-full p-3 text-white w-max shrink-0 grow-0">
          <MdOutlineShowChart className="text-xl" />
          Produk Terlaris
        </div>
        <hr className="flex-1 h-0.5 bg-slate-200" />
      </div>

      <div className="px-2 overflow-x-auto flex gap-2 scrollbar-hide">
        <ProductItem className="shrink-0 w-56" />
        <ProductItem className="shrink-0 w-56" />
        <ProductItem className="shrink-0 w-56" />
        <ProductItem className="shrink-0 w-56" />
      </div>
    </div>
  );
}

export default BestSellerProduct;
