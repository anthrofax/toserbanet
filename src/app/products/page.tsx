import Filter from "@/components/filter";
import ProductList from "@/components/product-list/product-list";
import ProductListSkeletons from "@/components/product-list/product-list-skeletons";
import { wixClientServer } from "@/lib/wix-client-server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function ListPage(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;

  const wixClient = await wixClientServer();

  let cat;
  try {
    cat = await wixClient.collections.getCollectionBySlug(
      searchParams?.cat || "all-products"
    );
  } catch (error) {
    cat = null;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative py-5">
      {/* Compaign */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64 mb-12">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            {" "}
            Dapatkan produk menarik dengan harga yang lebih terjangkau
          </h1>
          <Link href={'#daftar-produk'} className="rounded-3xl bg-slate-900 text-white w-max py-2 px-5 text-sm">
            Cek Sekarang
          </Link>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Filter */}
      <Filter />

      {/* Products */}
      <Suspense fallback={<ProductListSkeletons />}>
        <ProductList
          categoryId={
            cat?.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

export default ListPage;
