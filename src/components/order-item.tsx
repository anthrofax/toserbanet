import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";

function OrderItem({
  itemImage,
  itemName,
  price,
  quantity,
}: {
  itemImage: string;
  itemName: string;
  quantity: number;
  price: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative row-span-2 w-16 aspect-square rounded-lg overflow-hidden shrink-0">
        <Image
          src={wixMedia.getScaledToFillImageUrl(itemImage, 128, 128, {})}
          alt=""
          fill
          layout="cover"
          sizes="33vw"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">{itemName}</p>
        <p className="text-slate-700">{`${quantity} x ${price}`}</p>
      </div>
    </div>
  );
}

export default OrderItem;
