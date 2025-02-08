import { wixClientServer } from "@/lib/wix-client-server";
import { CheckoutLineItemType } from "@/types/checkout-types";
import { orders } from "@wix/ecom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const wixClient = await wixClientServer();
    const body = await req.json();

    console.log(body.metadata);

    const { transaction_status, order_id } = body;

    if (
      (transaction_status === "deny" ||
        transaction_status === "cancel" ||
        transaction_status === "expire" ||
        transaction_status === "failure") &&
      transaction_status !== "pending"
    ) {
      throw new Error("Pembayaran Gagal");
    }
    if (
      (transaction_status === "settlement" ||
        transaction_status === "capture") &&
      transaction_status !== "pending"
    ) {
      const { lineItems } = body.metadata;

      await wixClient.orders.createOrder({
        channelInfo: {},
        lineItems: lineItems.map((item: CheckoutLineItemType) => ({
          _id: item.id,
          itemType: {
            preset: orders.ItemTypeItemType.PHYSICAL,
          },
          price: {
            amount: item.price.toString(),
          },
          productName: {
            original: item.productName,
          },
          quantity: item.quantity,
        })),
        priceSummary: {
          total: {
            amount: body.gross_amount.toString(),
          },
        },
        currency: "IDR",
      });

      return NextResponse.json({ message: "Pembayaran Berhasil" });
    }

    return NextResponse.json({ message: "Pembayaran Berhasil" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
