import {
  MdKeyboardDoubleArrowDown,
  MdOutlineNewReleases,
} from "react-icons/md";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { ProductItemType } from "@/types/product-item";
import { wixClientServer } from "@/lib/wix-client-server";
import ProductListGrid from "./product-list-grid";

async function NewReleaseProduct() {
  const wixClient = await wixClientServer();

  // Temporary
  const productQuery = await wixClient.products
    .queryProducts()
    .descending("lastUpdated")
    .limit(10)
    .find();

  const productItems: ProductItemType[] = productQuery.items.map((prod) => {
    return {
      title: prod.name || "",
      imageObj: {
        imageAlt: prod.name || "",
        imageUrl: prod.media?.mainMedia?.image?.url || "",
        width: prod.media?.mainMedia?.image?.width || 0,
        height: prod.media?.mainMedia?.image?.height || 0,
      },
      price: {
        discountPrice: prod.priceData?.discountedPrice || 0,
        normalPrice: prod.priceData?.price || 0,
      },
      slug: prod.slug || "",
    };
  });

  return (
    <div className="py-5 flex flex-col gap-3">
      <div className="flex items-center">
        <div className="bg-blue-600 flex gap-2 items-center justify-center rounded-r-full p-3 text-white w-max shrink-0 grow-0">
          <MdOutlineNewReleases className="text-xl" />
          Produk Terbaru
        </div>
        <hr className="flex-1 h-0.5 bg-slate-200" />
      </div>

      <Suspense
        fallback={
          <div className="grid max-[400px]:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-x-2 md:gap-x-5 gap-y-5 container mx-auto px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                className="bg-slate-50 rounded-lg h-max shrink-0 bg-slate-300/50"
                key={i}
              />
            ))}
          </div>
        }
      >
        {<ProductListGrid productItems={productItems} />}
      </Suspense>

      <Link
        href="/products"
        className="border-2 text-slate-700 border-blue-500 rounded-full px-5 py-2 w-max flex items-center gap-2 text-md mx-auto my-5 transition-all hover:bg-blue-500 hover:text-slate-50"
      >
        Produk Lainnya <MdKeyboardDoubleArrowDown />
      </Link>
    </div>
  );
}

export default NewReleaseProduct;
