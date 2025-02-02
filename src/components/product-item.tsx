import { ProductItemType } from "@/types/product-item";
import { cn } from "@/utils/cn";
import { rupiahFormatter } from "@/utils/number-formatter";
import Image from "next/image";
import Link from "next/link";

function ProductItem({
  className,
  imageObj,
  price,
  title,
  slug,
}: {
  className?: string;
} & ProductItemType) {
  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        `bg-slate-50 rounded-lg h-max shrink-0 overflow-hidden`,
        className
      )}
    
    >
      <div
        className="w-full relative shrink-0"
        style={{
          paddingTop: `${
            imageObj.width && imageObj.height
              ? 100 / (imageObj.width / imageObj?.height)
              : 0
          }%`,
        }}
      >
        {imageObj?.imageUrl && imageObj?.imageAlt && (
          <Image
            src={imageObj.imageUrl}
            alt={imageObj.imageAlt}
            fill
            className="object-cover h-1/3 w-full"
          />
        )}
      </div>

      <div className="p-2 space-y-1">
        <p className="text-xs">
          {title?.length > 45 ? `${title.slice(0, 46)}...` : title}
        </p>
        <p className="font-bold text-xs">
          {Number(price).toString().length > 8
            ? rupiahFormatter.format(Number(price)).toString().slice(0, -2) +
              "..."
            : rupiahFormatter.format(price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;