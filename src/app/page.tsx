import ArticleList from "@/components/article-list";
import MainCategory from "@/components/main-category";
import Navbar from "@/components/navbar";
import ProductCategory from "@/components/product-category";
import ProductItem from "@/components/product-item";
import Slider from "@/components/slider";
import Image from "next/image";
import Link from "next/link";
import {
  MdKeyboardDoubleArrowDown,
  MdOutlineNewReleases,
  MdOutlineShowChart,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen pb-96">
      {/* Navbar */}
      <Navbar />

      {/* Kategori Kacamata */}
      <MainCategory />

      {/* Slider */}
      <Slider />

      {/* General Product Categori */}
      <ProductCategory />

      {/* List Produk Terlaris */}
      <div className="py-5 flex flex-col gap-3">
        <div className="flex items-center">
          <div className="bg-blue-600 flex gap-2 items-center justify-center rounded-r-full p-3 text-white w-max shrink-0 grow-0">
            <MdOutlineShowChart className="text-xl" />
            Produk Terlaris
          </div>
          <hr className="flex-1 h-0.5 bg-slate-200" />
        </div>

        <div className="px-2 overflow-x-auto flex gap-2 scrollbar-hide">
          <ProductItem className="shrink-0 w-56" />
          <ProductItem className="shrink-0 w-56" />
          <ProductItem className="shrink-0 w-56" />
          <ProductItem className="shrink-0 w-56" />
        </div>
      </div>

      {/* List Produk Terbaru */}
      <div className="py-5 flex flex-col gap-3">
        <div className="flex items-center">
          <div className="bg-blue-600 flex gap-2 items-center justify-center rounded-r-full p-3 text-white w-max shrink-0 grow-0">
            <MdOutlineNewReleases className="text-xl" />
            Produk Terbaru
          </div>
          <hr className="flex-1 h-0.5 bg-slate-200" />
        </div>

        <div className="mx-auto max-w-[80rem] px-5">
          <div className="grid max-[450px]:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-x-2 md:gap-x-5 gap-y-5">
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
            <ProductItem className="w-48 sm:w-56 xl:w-full" />
          </div>
        </div>

        <Link
          href=""
          className="border-2 text-slate-700 border-blue-500 rounded-full px-5 py-2 w-max flex items-center gap-2 text-md mx-auto my-5"
        >
          Produk Lainnya <MdKeyboardDoubleArrowDown />
        </Link>
      </div>

      {/* Artikel */}
      <ArticleList />

      {/* Testimoni Pelanggan */}
      <div className="py-5 flex flex-col gap-3">
        <h3 className="ml-2 font-bold text-xl">Testimoni Pelanggan</h3>

        <div className="px-2 overflow-x-auto flex gap-2 scrollbar-hide">
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
          <Link href="" className={`h-max shrink-0 w-56`}>
            <div className="h-44 w-full relative rounded-lg overflow-hidden">
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizZ7C-oTntchjnhU_OnYSnW1GDWC_mNhD9O0M7d0DLJgR2G_WH60_EPZahPtd9niSIiuskARD7E4KzWl9fkkemYeiE-1uzz67wlVG13jb_A3PxRNg9Kw5jBLTtUJVPD8xNL1AeRdoCwYXD/w640-h640/sa1+%25281%2529.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h4 className="font-bold">Mood Boards for Product Designers</h4>
            </div>
          </Link>
        </div>
      </div>

      {/* Layanan Toko Kami */}

      {/* Footer */}

      {/* Cart Modal */}
    </div>
  );
}
