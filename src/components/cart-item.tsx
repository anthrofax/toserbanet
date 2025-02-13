import { currentCart } from "@wix/ecom";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { media as wixMedia } from "@wix/sdk";
import { gramFormatter, rupiahFormatter } from "@/utils/number-formatter";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClientContext } from "@/contexts/wix-context";

function CartItem({ cartItem }: { cartItem: currentCart.LineItem }) {
  const { isLoading, updateQuantity, removeItem } = useCartStore();
  const wixClient = useWixClientContext();

  if (!cartItem) return null;

  return (
    <div className="flex-1 flex gap-3 items-center relative bg-slate-200 rounded-lg px-3 py-2">
      <div className="relative w-[25%] max-w-32 aspect-square rounded-xl overflow-hidden shrink-0">
        {cartItem.image && (
          <Image
            fill
            src={wixMedia.getScaledToFillImageUrl(cartItem.image, 128, 128, {})}
            alt={`${cartItem.productName}`}
          />
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[60%]">
        <p className="text-xs sm:text-sm line-clamp-2 font-semibold">
          {cartItem.productName?.original}
        </p>
        {cartItem.catalogReference?.options &&
          cartItem.catalogReference?.options?.variantName && (
            <h4 className="font-medium text-xs sm:text-sm">
              Varian: {cartItem.catalogReference.options?.variantName}
            </h4>
          )}

        <div className="flex justify-between items-center gap-2 w-max">
          <div
            className={`rounded-full p-2 w-3 h-3 border flex justify-center items-center ${
              isLoading
                ? "cursor-not-allowed text-slate-200"
                : "cursor-pointer border-slate-400"
            }`}
          >
            <FaMinus
              className={`shrink-0 text-xs sm:text-sm ${
                isLoading ? "text-slate-200" : "text-slate-400"
              }`}
              onClick={() => {
                if (cartItem.quantity === 1)
                  removeItem(wixClient, cartItem._id!);
                else
                  updateQuantity(
                    wixClient,
                    cartItem._id!,
                    cartItem?.quantity ? cartItem.quantity - 1 : 0
                  );
              }}
            />
          </div>
          <p className="text-xs">{cartItem.quantity}</p>
          <div
            className={`rounded-full p-2 w-3 h-3 border flex justify-center items-center ${
              isLoading
                ? "cursor-not-allowed text-slate-200"
                : "cursor-pointer border-slate-400"
            }`}
          >
            <FaPlus
              className={`shrink-0 text-xs ${
                isLoading ? "text-slate-200" : "text-slate-400"
              }`}
              onClick={() =>
                updateQuantity(
                  wixClient,
                  cartItem._id!,
                  cartItem?.quantity ? cartItem.quantity + 1 : 0
                )
              }
            />
          </div>
        </div>

        <p className="text-xs md:text-sm">
          Berat:{" "}
          {gramFormatter.format(
            cartItem?.physicalProperties?.weight
              ? cartItem.physicalProperties.weight * 1000
              : 0
          )}
        </p>
        <p className="text-green-500 text-xs sm:text-sm font-medium">
          Sub Total{" "}
          {cartItem.price?.amount
            ? rupiahFormatter.format(+cartItem.price.amount)
            : 0}
        </p>
      </div>

      <MdDeleteForever
        className={`text-xl sm:text-3xl absolute top-3 md:top-1/2 md:-translate-y-1/2 right-1 ${
          isLoading
            ? "cursor-not-allowed text-slate-300"
            : "cursor-pointer text-slate-500"
        }`}
        onClick={() => removeItem(wixClient, cartItem._id!)}
      />
    </div>
  );
}

export default CartItem;
