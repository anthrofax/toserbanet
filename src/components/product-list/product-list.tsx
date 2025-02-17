import ProductListGrid from "../product-list-grid";
import { ProductItemType } from "@/types/product-item";
import { wixClientServer } from "@/lib/wix-client-server";
import { products } from "@wix/stores";
import Pagination from "../pagination";
import { CiSearch } from "react-icons/ci";
import NotFoundInfo from "../not-found-info";

interface PropsType {
  limit?: number;
  categoryId: string;
  searchParams?: any;
}

const PRODUCT_PER_PAGE = 8;

async function ProductList({ categoryId, limit, searchParams }: PropsType) {
  const wixClient = await wixClientServer();

  // Buat query dasar untuk mendapatkan produk
  const productQuery = wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999999);

  let res: products.ProductsQueryResult;

  // Menambahkan pengurutan jika ada parameter sort
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    if (sortType === "asc") {
      res = await productQuery.ascending(sortBy).find();
    }
    if (sortType === "desc") {
      res = await productQuery.descending(sortBy).find();
    }
  } else {
    // Default pengurutan berdasarkan waktu pembaruan produk
    res = await productQuery.descending("lastUpdated").find();
  }

  if (!res!) return null;

  let productItems: ProductItemType[] = res.items.map((prod) => {
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
  });

  // Filter berdasarkan pencarian nama produk jika ada
  if (searchParams?.name) {
    productItems = productItems.filter((item) => {
      return String(searchParams.name)
        .toLowerCase()
        .split(" ")
        .some((queryWord) => {
          console.log(queryWord, item.title);
          console.log(item.title.toLowerCase().includes(queryWord));
          return item.title.toLowerCase().includes(queryWord);
        });
    });
  }

  // Paginasi secara manual setelah filter
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const startIndex = (currentPage - 1) * (limit || PRODUCT_PER_PAGE);
  const paginatedItems = productItems
    .slice(startIndex, startIndex + (limit || PRODUCT_PER_PAGE))
    .filter((item) => item.quantity > 0);

  return (
    <div className="min-h-[30rem]" id="daftar-produk">
      {productItems.length > 0 && (
        <div className="ml-2 my-5 flex items-center gap-2">
          <CiSearch className="text-3xl font-semibold" />
          <h1 className="text-xl font-semibold">Hasil Pencarian</h1>
        </div>
      )}
      {paginatedItems.length > 0 ? (
        <>
          <ProductListGrid productItems={paginatedItems} />
          <Pagination
            className="mt-5"
            currentPage={currentPage}
            hasPrev={currentPage > 1}
            hasNext={
              currentPage <
              Math.ceil(productItems.length / (limit || PRODUCT_PER_PAGE))
            }
          />
        </>
      ) : (
        <NotFoundInfo
          description="Coba kata kunci lain atau sesuaikan pengaturan filter"
          object="Produk"
        />
      )}
    </div>
  );
}

export default ProductList;
