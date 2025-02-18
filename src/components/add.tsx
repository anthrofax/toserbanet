"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { products } from "@wix/stores";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface PropsType {
  productData: products.Product;
  variantId: string | null;
  stockQuantity: number;
}

function Add({ stockQuantity, productData, variantId }: PropsType) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(type: string) {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  }

  function handleWhatsAppOrder(productData: { name: string }) {
    const message = `Halo, apakah "${productData.name}" ada?`;

    const whatsappUrl = `https://wa.me/6285719129137?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  const wixClient = useWixClientContext();

  const { addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-1">
      <h4 className="font-medium">Kuantitas</h4>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 border-2 border-slate-700 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className={`text-xl ${
                quantity === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className={`text-xl ${
                quantity === stockQuantity
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          <div className="text-xs md:text-base lg:text-sm">
            {stockQuantity < 10 ? (
              <div>
                Stok tersisa{" "}
                <span className="text-orange-500">{stockQuantity}</span> lagi!
              </div>
            ) : (
              `Stok tersedia ${stockQuantity} barang`
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <button
            onClick={() =>
              addItem(
                wixClient,
                productData._id!,
                variantId!,
                quantity,
                `${window.location.origin}/products/${productData.slug}`
              )
            }
            disabled={isLoading || stockQuantity < 1}
            className="w-36 text-sm rounded-3xl ring-1 ring-blue-500 text-blue-500 py-2 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:bg-blue-200 disabled:text-white disabled:ring-0"
          >
            Tambahkan ke keranjang
          </button>
          <button
            onClick={() => {
              handleWhatsAppOrder({
                name: productData.name!,
              });
            }}
            disabled={!productData}
            className="flex gap-1 justify-center items-center w-48 text-sm rounded-3xl ring-1 ring-green-800 text-green-800 py-2 hover:bg-green-800 hover:text-white disabled:cursor-not-allowed disabled:bg-green-200 disabled:text-white disabled:ring-0"
          >
            <FaWhatsapp className="text-xl" />
            <span>Order Via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
