"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface PropsType {
  productData: products.Product;
  variantId: string | null;
  stockQuantity: number;
}

interface OrderWhatsAppProductData {
  name: string;
  slug: string;
  price: number;
  currency: string;
  stock: number;
  description: string;
  productPageUrl: string;
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

  function handleWhatsAppOrder(productData: OrderWhatsAppProductData) {
    const message =
      `Halo, saya ingin memesan produk berikut:\n\n` +
      `*Nama Produk*: ${productData.name}\n` +
      `*Harga*: ${productData.currency} ${productData.price}\n` +
      `*Jumlah*: ${quantity}\n` +
      `*Deskripsi*: ${productData.description}\n\n` +
      `Detail produk dapat dilihat di: ${productData.productPageUrl}\n\n` +
      `Terima kasih!`;

    const whatsappUrl = `https://wa.me/6285781484100?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  const wixClient = useWixClientContext();

  const { cart, addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
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
          <div className="text-xs">
            Only <span className="text-orange-500">{stockQuantity} items</span>{" "}
            left!
            <br /> {"Don't"} miss it
          </div>
        </div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <button
            onClick={() =>
              addItem(wixClient, productData._id!, variantId!, quantity)
            }
            disabled={isLoading || stockQuantity < 1}
            className="w-36 text-sm rounded-3xl ring-1 ring-blue-500 text-blue-500 py-2 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:bg-blue-200 disabled:text-white disabled:ring-0"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              handleWhatsAppOrder({
                name: productData.name!,
                slug: productData.slug!,
                price: productData.priceData!.price!,
                currency: productData.priceData!.currency!,
                stock: stockQuantity!,
                description: productData.description!,
                productPageUrl:
                  productData.productPageUrl!.base +
                  productData.productPageUrl!.path!,
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
