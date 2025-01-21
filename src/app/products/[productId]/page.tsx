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
  const productId = (await params).productId;
  const wixClient = await wixClientServer();
  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", productId)
    .find();

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

  console.log(product);
  console.log(marketplaceLinks);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 py-5">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages imageItems={product.media?.items} />
      </div>

      {/* Texts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          {product.priceData?.discountedPrice === product.priceData?.price ? (
            <h2 className="font-medium text-2xl">
              {product.priceData?.formatted?.price}
            </h2>
          ) : (
            <>
              <h3 className="text-xl text-gray-500 line-through">
                {product.priceData?.formatted?.price}
              </h3>
              <h2 className="font-medium text-2xl">
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
            productId={product._id!}
          />
        ) : (
          <Add
            stockQuantity={product.stock?.quantity || 0}
            productId={product._id!}
            variantId={null}
          />
        )}
        <div className="h-[2px] bg-gray-200 rounded-full" />

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Belanja Via Marketplace:</h3>
          <MarketplaceList marketplaceLinks={marketplaceLinks} />
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
