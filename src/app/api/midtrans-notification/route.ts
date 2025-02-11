import { wixClientServer } from "@/lib/wix-client-server";
import {
  CheckoutLineItemType,
  MidtransNotificationMetadata,
} from "@/types/checkout-types";
import { orders } from "@wix/ecom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const wixClient = await wixClientServer();

    console.log(req)
    if (!req.body) {
      throw new Error("Request body is empty");
    }
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
      const {
        lineItems,
        buyerInfo: { contactId, email, phone, fullName },
        alamat: { alamatUtama, kota },
        catatan,
        ongkir,
        layananKurir,
      } = body.metadata as MidtransNotificationMetadata;

      const order = await wixClient.orders.createOrder({
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
          shipping: {
            amount: ongkir.toString(),
          },
          total: {
            amount: body.gross_amount.toString(),
          },
        },
        currency: "IDR",
        buyerInfo: {
          contactId,
          email,
        },
        customFields: [
          {
            title: "catatan",
            value: catatan,
          },
          {
            title: "layananKurir",
            value: layananKurir,
          },
        ],
        billingInfo: {
          address: {
            addressLine1: alamatUtama,
            city: kota,
          },
          contactDetails: {
            firstName:
              fullName.split(" ").length < 2
                ? fullName
                : fullName.split(" ")[0],
            lastName: fullName.split(" ").slice(1).join(" "),
            phone,
          },
        },
        paymentStatus: orders.PaymentStatus.PAID,
        purchasedDate: new Date(body.transaction_time),
        weightUnit: orders.WeightUnit.KG,
      });

      console.log("order");
      console.log(order);

      return NextResponse.json({ message: "Pembayaran Berhasil" });
    }

    return NextResponse.json({ message: "Pembayaran Berhasil" });
  } catch (error) {
    console.dir(error, { depth: null, colors: true });
    return NextResponse.json({ error });
  }
}
