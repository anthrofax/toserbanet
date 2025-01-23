import { wixClientServer } from "@/lib/wix-client-server";

async function OrderWhatsAppButton({ productId }: { productId: string }) {
  const wixClient = await wixClientServer();

  const res = await wixClient.products
    .queryProducts()
    .eq("_id", productId)
    .find();

  const product = res.items[0];

  return <div></div>;
}

export default OrderWhatsAppButton;
