import { wixAdminServer } from "@/lib/wix-admin-server";
import {
  CheckoutLineItemType,
  MidtransNotificationMetadata,
} from "@/types/checkout-types";
import { orders } from "@wix/ecom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const wixClient = await wixAdminServer();

    console.log(req);
    if (!req.body) {
      throw new Error("Request body is empty");
    }
    const body = await req.json();

    console.log("metadata", body.metadata);
    body.payment_type as "gopay" | "qris" | "shopeepay" | "bank_transfer";

    const { transaction_status } = body;

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
        buyerInfo: { contactId, email, memberId, nama, nomorHp },
        alamat,
        catatan,
        ongkir,
        layananKurir,
      } = body.metadata as MidtransNotificationMetadata;

      console.log("metadata", body.metadata);
      const order = await wixClient.orders.createOrder({
        channelInfo: {},
        lineItems: lineItems.map(
          ({
            id,
            image,
            itemType,
            price,
            productName,
            quantity,
            weight,
            catalogReference: { appId, catalogItemId, options },
          }: CheckoutLineItemType) => ({
            id: id,
            image,
            productName: {
              original: productName,
            },
            quantity: quantity,
            itemType: {
              preset: itemType,
            },
            price: {
              amount: price.toFixed(2),
            },
            paymentOption: orders.PaymentOptionType.FULL_PAYMENT_ONLINE,
            physicalProperties: {
              weight: weight,
            },
            catalogReference: {
              appId,
              catalogItemId,
              options,
            },
            taxInfo: {
              taxIncludedInPrice: false,
              taxPercentage: 0,
            },
          })
        ),
        buyerInfo: {
          contactId,
          email,
          memberId,
        },
        paymentStatus: orders.PaymentStatus.PAID,
        weightUnit: orders.WeightUnit.KG,
        currency: "IDR",
        taxIncludedInPrices: false,
        priceSummary: {
          subtotal: {
            amount: lineItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)
              .toString(),
          },
          shipping: {
            amount: ongkir.toFixed(2).toString(),
          },
          total: {
            amount: (
              lineItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ) + ongkir
            ).toString(),
            formattedAmount: `$${(
              lineItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ) + ongkir
            ).toFixed(2)}`,
          },
        },
        billingInfo: {
          address: {
            country: "ID",
            addressLine1: alamat,
            countryFullname: "Indonesia",
          },
          contactDetails: {
            firstName: nama.split(" ").length < 2 ? nama : nama.split(" ")[0],
            lastName:
              nama.split(" ").length < 2
                ? ""
                : nama.split(" ").slice(1).join(" "),
            phone: nomorHp,
            company: "",
          },
        },
        shippingInfo: {
          title: layananKurir,
          logistics: {
            shippingDestination: {
              address: {
                country: "ID",
                addressLine1: alamat,
                countryFullname: "Indonesia",
              },
              contactDetails: {
                firstName:
                  nama.split(" ").length < 2 ? nama : nama.split(" ")[0],
                lastName:
                  nama.split(" ").length < 2
                    ? ""
                    : nama.split(" ").slice(1).join(" "),
                phone: nomorHp,
              },
            },
          },
          cost: {
            price: {
              amount: ongkir.toString(),
            },
          },
        },
        status: orders.OrderStatus.APPROVED,
        archived: false,
        createdBy: {
          userId: memberId,
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
          {
            title: "metodePembayaran",
            value:
              body.payment_type === "bank_transfer"
                ? body.va_numbers[0].bank
                : body.payment_type,
          },
          {
            title: "buktiPembayaran",
            value: "",
          },
        ],
        purchasedDate: new Date(body.transaction_time),
      });

      console.log("order");
      console.dir(order, { depth: null });

      return NextResponse.json({ message: "Pembayaran Berhasil" });
    }

    return NextResponse.json({ message: "Pembayaran Berhasil" });
  } catch (error) {
    console.log("error midtrans");
    console.dir(error, { depth: null, colors: true });
    return NextResponse.json({ error });
  }
}
