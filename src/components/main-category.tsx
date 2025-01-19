import { wixClientServer } from "@/lib/wix-client-server";
import Link from "next/link";

async function MainCategory() {
  const wixClient = await wixClientServer();
  const { items } = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-5 md:px-10 lg:px-20 py-5 flex gap-5 md:gap-10 lg:gap-20 max-w-screen overflow-x-auto scrollbar-hide whitespace-nowrap">
      {items.map((item) => (
        <Link
          href={`/products?cat=${item.slug}`}
          className="font-bold shrink-0"
          key={item._id}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default MainCategory;
