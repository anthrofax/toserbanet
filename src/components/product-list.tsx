import Image from "next/image";
import Link from "next/link";
import ProductListGrid from "./product-list-grid";
import { ProductItemType } from "@/types/product-item";
import { wixClientServer } from "@/lib/wix-client-server";
import { products } from "@wix/stores";
import Pagination from "./pagination";

interface PropsType {
  limit?: number;
  categoryId: string;
  searchParams?: any;
}

const PRODUCT_PER_PAGE = 8;

async function ProductList({ categoryId, limit, searchParams }: PropsType) {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? (parseInt(searchParams.page) - 1) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  let res: products.ProductsQueryResult;

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      res = await productQuery.ascending(sortBy).find();
    }
    if (sortType === "desc") {
      res = await productQuery.descending(sortBy).find();
    }
  } else {
    res = await productQuery.find();
  }

  if (!res!) return null;

  const productItems: ProductItemType[] = res.items.map((prod) => {
    return {
      title: prod.name || "",
      imageObj: {
        imageAlt: prod.name || "",
        imageUrl: prod.media?.mainMedia?.image?.url || "",
      },
      price: prod.priceData?.price || 0,
      slug: prod.slug || "",
    };
  });

  return (
    <>
      <ProductListGrid productItems={productItems} />
      <Pagination
        className="mt-5"
        currentPage={(res.currentPage || 0) + 1}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </>
  );
}

export default ProductList;
