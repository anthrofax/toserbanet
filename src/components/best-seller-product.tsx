import { MdOutlineShowChart } from "react-icons/md";
import { wixClientServer } from "@/lib/wix-client-server";
import ListProductScroll from "./list-product-scroll";
import { ProductItemType } from "@/types/product-item";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

async function BestSellerProduct() {
  const wixClient = await wixClientServer();

  // Temporary
  const productQuery = await wixClient.products
    .queryProducts()
    .limit(10)
    .find();

  const productItem: ProductItemType[] = productQuery.items
    .map((prod) => {
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
        quantity: prod.stock?.quantity ? +prod.stock.quantity : 0,
      };
    })
    .filter((item) => item.quantity > 0);

  return (
    <div className="py-5 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="bg-blue-600 flex gap-1 items-center justify-center rounded-r-full p-2 pr-4 text-white w-max shrink-0 grow-0 text-xs md:text-sm">
          <MdOutlineShowChart className="text-xl" />
          Produk Terlaris
        </div>
        <hr className="flex-1 h-0.5 bg-slate-200" />
      </div>

      <Suspense
        fallback={
          <div className="px-2 overflow-x-auto flex gap-2 scrollbar-hide">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                className="bg-slate-50 rounded-lg h-max shrink-0 bg-slate-300/50"
                key={i}
              />
            ))}
          </div>
        }
      >
        {<ListProductScroll productItem={productItem} />}
      </Suspense>
    </div>
  );
}

export default BestSellerProduct;
