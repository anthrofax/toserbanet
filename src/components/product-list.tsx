import Image from "next/image";
import Link from "next/link";

function ProductList() {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease-linear"
          />
          <Image
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">Rp.49.000</span>
        </div>

        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl ring-1 ring-accent text-accent py-2 px-4 text-xs hover:bg-accent hover:text-white w-max">
          Tambahkan ke keranjang
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease-linear"
          />
          <Image
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">Rp.49.000</span>
        </div>

        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl ring-1 ring-accent text-accent py-2 px-4 text-xs hover:bg-accent hover:text-white w-max">
          Tambahkan ke keranjang
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease-linear"
          />
          <Image
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">Rp.49.000</span>
        </div>

        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl ring-1 ring-accent text-accent py-2 px-4 text-xs hover:bg-accent hover:text-white w-max">
          Tambahkan ke keranjang
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease-linear"
          />
          <Image
            src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">Rp.49.000</span>
        </div>

        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl ring-1 ring-accent text-accent py-2 px-4 text-xs hover:bg-accent hover:text-white w-max">
          Tambahkan ke keranjang
        </button>
      </Link>
    </div>
  );
}

export default ProductList;