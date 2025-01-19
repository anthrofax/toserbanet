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
    <div className="flex justify-between gap-3 items-center min-w-[35rem] bg-slate-200 p-3 rounded-xl">
      <div className="flex-1 flex gap-5 items-center">
        <div className="relative h-32 w-32 aspect-square rounded-xl overflow-hidden">
          {cartItem.image && (
            <Image
              fill
              src={wixMedia.getScaledToFillImageUrl(
                cartItem.image,
                128,
                128,
                {}
              )}
              alt={`${cartItem.productName}`}
            />
          )}
        </div>

        <div className="flex flex-col  gap-1 ">
          <h3 className="font-bold text-xl">
            {" "}
            {cartItem.productName?.original}
          </h3>
          <h4 className="font-semibold text-lg">Size 39, Warna Kuning</h4>

          <div className="flex justify-between items-center gap-2 w-max">
            <div
              className={`rounded-full p-3 w-3 h-3 border flex justify-center items-center ${
                isLoading
                  ? "cursor-not-allowed text-slate-200"
                  : "cursor-pointer border-slate-400"
              }`}
            >
              <FaMinus
                className={`shrink-0 text-sm ${
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
            <p>{cartItem.quantity}</p>
            <div
              className={`rounded-full p-3 w-3 h-3 border flex justify-center items-center ${
                isLoading
                  ? "cursor-not-allowed text-slate-200"
                  : "cursor-pointer border-slate-400"
              }`}
            >
              <FaPlus
                className={`shrink-0 text-sm ${
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

          <p className="font-semibold">
            Berat:{" "}
            {gramFormatter.format(cartItem?.physicalProperties?.weight || 0)}
          </p>
          <p className="text-green-500 text-lg font-semibold">
            Sub Total{" "}
            {cartItem.price?.amount
              ? rupiahFormatter.format(+cartItem.price.amount)
              : 0}
          </p>
        </div>
      </div>

      <MdDeleteForever
        className={`text-3xl ${
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
