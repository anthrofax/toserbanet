import Add from "@/components/add";
import CustomizeProducts from "@/components/customize-products";
import MarketplaceList from "@/components/marketplace-list";
import ProductImages from "@/components/product-images";
import { wixClientServer } from "@/lib/wix-client-server";
import { notFound } from "next/navigation";

async function SinglePage({
  params,
}: {
  params: Promise<{
    productId: string;
  }>;
}) {
  const productId = decodeURIComponent((await params).productId);
  const wixClient = await wixClientServer();
  console.log(productId);
  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", productId)
    .find();

  console.log(items);

  const product = items[0];

  if (!product) return notFound();

  const marketplaceLinks =
    product.additionalInfoSections?.filter((additionalInfo) => {
      if (
        additionalInfo.title === "tokopedia" ||
        additionalInfo.title === "shopee" ||
        additionalInfo.title === "tiktok"
      ) {
        return true;
      }

      return false;
    }) || [];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-8 lg:gap-16 pt-6 pb-12">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-28 h-max">
        <ProductImages imageItems={product.media?.items} />
      </div>

      {/* Texts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-3">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {product.name}
        </h1>
        <div
          className="text-gray-700 text-sm md:text-base flex flex-col w-full"
          style={{
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: product?.description || "",
          }}
        ></div>

        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4 text-lg md:text-xl">
          {product.priceData?.discountedPrice === product.priceData?.price ? (
            <h2 className="font-medium text-xl">
              {product.priceData?.formatted?.price}
            </h2>
          ) : (
            <>
              <h3 className="text-lg  text-gray-500 line-through">
                {product.priceData?.formatted?.price}
              </h3>
              <h2 className="font-medium text-xl">
                {product.priceData?.formatted?.discountedPrice}
              </h2>
            </>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />
        {product.productOptions &&
        product.productOptions.length > 0 &&
        product.variants &&
        product.variants.length > 0 &&
        Object.keys(product.variants[0].choices || {}).length > 0 ? (
          <CustomizeProducts
            productOptions={product.productOptions}
            variants={product.variants}
            productData={product}
          />
        ) : (
          <Add
            stockQuantity={product.stock?.quantity || 0}
            productData={product}
            variantId={null}
          />
        )}
        {marketplaceLinks.length > 0 && (
          <>
            <div className="h-[2px] bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold">
                Belanja Via Marketplace:
              </h3>
              <MarketplaceList marketplaceLinks={marketplaceLinks} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SinglePage;
