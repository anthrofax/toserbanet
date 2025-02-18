import { ProductItemType } from "@/types/product-item";
import { cn } from "@/utils/cn";
import { rupiahFormatter } from "@/utils/number-formatter";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDiscount } from "react-icons/md";

function ProductItem({
  className,
  imageObj,
  price,
  title,
  slug,
  identifier
}: {
  className?: string;
} & ProductItemType) {
  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        `bg-slate-50 rounded-lg h-[17rem] shrink-0 overflow-hidden`,
        className
      )}
    >
      <div className="w-full h-3/4 relative shrink-0">
        {imageObj?.imageUrl && imageObj?.imageAlt && (
          <Image
            src={imageObj.imageUrl}
            alt={imageObj.imageAlt}
            fill
            className="object-contain h-1/3 w-full"
          />
        )}
      </div>

      <div className="p-2 space-y-1">
        <p className={`text-xs ${identifier === 'list-scroll' ? 'line-clamp-1' : 'line-clamp-2'}`}>{title}</p>
        {price.normalPrice === price.discountPrice ? (
          <p className="text-xs line-clamp-1 font-bold">
            {rupiahFormatter.format(price.discountPrice)}
          </p>
        ) : (
          <div className="flex items-center gap-0.5 line-clamp-1">
            <div className="font-bold text-xs flex items-center gap-0.5 bg-blue-200 text-blue-500 border border-blue-300 rounded-lg p-0.5 shrink-0">
              <MdOutlineDiscount />
              <p>{rupiahFormatter.format(price.discountPrice)}</p>
            </div>
            <p className="font-bold text-[10px] text-slate-500 line-through line-clamp-1 truncate shrink-0">
              {rupiahFormatter.format(price.normalPrice)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductItem;
