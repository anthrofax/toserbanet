import ArticleList from "@/components/article-list";
import BestSellerProduct from "@/components/best-seller-product";
import CustomerTestimoni from "@/components/customer-testimoni";
import MainCategory from "@/components/main-category";
import NewReleaseProduct from "@/components/new-release-product";
import ProductCategory from "@/components/product-category";
import ShopService from "@/components/shop-service";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <div>
      {/* Kategori Kacamata */}
      <MainCategory />

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
      <ArticleList />

      {/* Testimoni Pelanggan */}
      <CustomerTestimoni />

      {/* Layanan Toko Kami */}
      <ShopService />
    </div>
  );
}
