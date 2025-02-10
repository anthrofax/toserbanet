import { ProductItemType } from "@/types/product-item";
import ProductItem from "./product-item";

function ListProductScroll({
  productItem,
}: {
  productItem: ProductItemType[];
}) {
  if (!productItem) return null;

  return (
    <div className="px-2 overflow-x-auto flex gap-2 scrollbar-hide">
      {productItem.map((product, i) => (
        <ProductItem
          className="w-44 h-[13.8rem]"
          imageObj={product.imageObj}
          price={product.price}
          title={product.title}
          slug={product.slug}
          key={i}
          identifier="list-scroll"
        />
      ))}
    </div>
  );
}

export default ListProductScroll;
