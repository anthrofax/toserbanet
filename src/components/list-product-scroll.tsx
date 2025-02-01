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
          className="w-40"
          imageObj={product.imageObj}
          price={product.price}
          title={product.title}
          slug={product.slug}
          key={i}
        />
      ))}
    </div>
  );
}

export default ListProductScroll;
