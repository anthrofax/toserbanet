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
      className={`bg-slate-50 rounded-lg h-[20rem] shrink-0 ${
        className ? className : ""
      } overflow-hidden`}
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
        <h4 className="lg:text-base">
          {title?.length > 20 ? `${title.slice(0, 21)}...` : title}
        </h4>
        <p className="font-bold text-sm">
          {Number(900000000).toString().length > 8
            ? rupiahFormatter.format(Number(900000000)).toString().slice(0, -2) +
              "..."
            : rupiahFormatter.format(900000000)}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
