import { ProductItemType } from "@/types/product-item";
import ProductItem from "./product-item";

function ProductListGrid({ productItem }: { productItem: ProductItemType[] }) {
  if (!productItem) return null;

  return (
    <div className="grid max-[400px]:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center gap-x-2 md:gap-x-5 gap-y-5 container mx-auto px-2">
      {productItem.map((product, i) => (
        <ProductItem
          imageObj={product.imageObj}
          price={product.price}
          title={product.title}
          slug={product.slug}
          key={i}
          className="w-full"
        />
      ))}
    </div>
  );
}

export default ProductListGrid;
