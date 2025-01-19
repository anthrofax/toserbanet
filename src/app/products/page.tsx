import Filter from "@/components/filter";
import ProductList from "@/components/product-list";
import Image from "next/image";

function ListPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative pb-5">
      {/* Compaign */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            {" "}
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-accent text-white w-max px-5 text-sm">
            BUY NOW
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Filter */}
      <Filter />

      {/* Products */}
      <h1 className="mt-12 text-xl font-semibold">Shoes for you!</h1>
      <ProductList />
    </div>
  );
}

export default ListPage;
