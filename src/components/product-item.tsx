import { ProductItemType } from "@/types/product-item";
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
      className={`bg-slate-50 rounded-lg h-max shrink-0 ${className ? className : ""}`}
    >
      <div className="h-56 w-full relative">
        {imageObj?.imageUrl && imageObj?.imageAlt && (
          <Image
            src={imageObj.imageUrl}
            alt={imageObj.imageAlt}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <h4 className="">
          {title?.length > 30 ? `${title.slice(0, 31)}...` : title}
        </h4>
        <p className="font-bold text-xl">{rupiahFormatter.format(price)}</p>
      </div>
    </Link>
  );
}

export default ProductItem;
