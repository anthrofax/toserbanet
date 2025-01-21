"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface PropsType {
  productId: string;
  variantId: string | null;
  stockQuantity: number;
}

function Add({ stockQuantity, productId, variantId }: PropsType) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClientContext();

  const { cart, addItem, isLoading } = useCartStore();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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
            onClick={() => addItem(wixClient, productId, variantId!, quantity)}
            disabled={isLoading || stockQuantity < 1}
            className="w-36 text-sm rounded-3xl ring-1 ring-blue-500 text-blue-500 py-2 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:bg-blue-200 disabled:text-white disabled:ring-0"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {}}
            disabled={isLoading || stockQuantity < 1}
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
