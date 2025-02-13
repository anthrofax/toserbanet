"use client";

import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import Link from "next/link";
import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

function OrderItem({
  itemImage,
  itemName,
  price,
  quantity,
  catalogReference: { catalogItemId, options },
}: {
  itemImage: string;
  itemName: string;
  quantity: number;
  price: string;
  catalogReference: {
    appId: string;
    catalogItemId: string;
    options?: any;
  };
}) {
  let wixClient = useWixClientContext();

  const { data: variant, isLoading } = useQuery({
    queryKey: ["variantId", options?.variantId, catalogItemId],
    queryFn: async () => {
      if (!options?.variantId) {
        return null;
      }

      const variant = await wixClient.products.getStoreVariant(
        `${catalogItemId}-${options.variantId}`
      );

      return variant;
    },
  });

  return (
    <Link href={options?.productLink || ""} className="flex gap-2 items-center">
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
        {isLoading ? (
          <Skeleton className="w-24 h-6 bg-slate-300/50 shrink-0" />
        ) : (
          variant &&
          variant.variant?.choices && (
            <p>
              {Object.entries(variant.variant.choices)
                .map((variantType) => `${variantType[0]}: ${variantType[1]}`)
                .join(", ")}
            </p>
          )
        )}
      </div>
    </Link>
  );
}

export default OrderItem;
