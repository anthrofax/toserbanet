import ArticleList from "@/components/article-list";
import BestSellerProduct from "@/components/best-seller-product";
import CustomerTestimoni from "@/components/customer-testimoni";
import MainCategory from "@/components/main-category";
import NewReleaseProduct from "@/components/new-release-product";
import ProductCategory from "@/components/product-category";
import ShopService from "@/components/shop-service";
import Slider from "@/components/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="pb-0">
      {/* Kategori Kacamata */}
      <Suspense
        fallback={
          <div className="px-5 md:px-10 lg:px-20 py-5 flex gap-4 md:gap-12 lg:gap-16 max-w-screen overflow-x-auto scrollbar-hide whitespace-nowrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton className="w-24 h-8 bg-slate-300/50 shrink-0" key={i} />
            ))}
          </div>
        }
      >
        <MainCategory />
      </Suspense>

      {/* Slider */}
      <Slider />

      {/* General Product Categori */}
      <ProductCategory />

      <div className="w-full container mx-auto">
        {/* List Produk Terlaris */}
        <BestSellerProduct />

        {/* List Produk Terbaru */}
        <NewReleaseProduct />
      </div>

      {/* Artikel */}
      {/* <ArticleList /> */}

      {/* Testimoni Pelanggan */}
      <CustomerTestimoni />

      {/* Layanan Toko Kami */}
      <ShopService />
    </div>
  );
}
