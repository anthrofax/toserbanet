"use server";

import { CheckoutDataType, CheckoutLineItemType } from "@/types/checkout-types";
import { wixAdminServer } from "./wix-admin-server";
import { orders } from "@wix/ecom";
import axios from "axios";

const wixClient = await wixAdminServer();

export async function createOrder({
  alamat,
  lineItems,
  catatan,
  ongkir,
  informasiPembeli: { email, nama, nomorHp, contactId, memberId },
  layananKurir,
}: CheckoutDataType) {
  try {
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
      paymentStatus: orders.PaymentStatus.NOT_PAID,
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
              firstName: nama.split(" ").length < 2 ? nama : nama.split(" ")[0],
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
          value: "Transfer Bank (Manual)",
        },
        {
          title: "buktiPembayaran",
          value: "",
        },
      ],
      purchasedDate: new Date(),
    });

    console.log(order);

    return order;
  } catch (error) {
    console.error("Wix Order Error: ", error);

    throw new Error("Wix Order Error: " + error);
  }
}

export async function updateBuktiPembayaran(
  orderId: string,
  linkFotoBuktiPembayaran: string
) {
  const updatedOrder = await wixClient.orders.updateOrder(orderId, {
    customFields: [
      {
        title: "buktiPembayaran",
        value: "test",
      },
    ],
  });

  return { updatedOrder };
}

export async function getBuktiPembayaran() {
  try {
    const buktiPembayaran = await axios.get(
      "https://afridhoikhsan.wixsite.com/toserbanet/_functions/buktiPembayaran"
    );

    return [...buktiPembayaran.data.body];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getBuktiPembayaranById(orderId: string) {
  try {
    const buktiPembayaran = await axios.get(
      `https://afridhoikhsan.wixsite.com/toserbanet/_functions/buktiPembayaranById?orderId=${orderId}`
    );

    return {
      ...buktiPembayaran.data.body,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addBuktiPembayaran(
  orderId: string,
  linkBuktiPembayaran: string,
  namaFoto: string,
  orderNumber: string
) {
  try {
    const buktiPembayaran = await axios.put(
      "https://afridhoikhsan.wixsite.com/toserbanet/_functions/buktiPembayaran",
      {
        orderId,
        linkBuktiPembayaran,
        namaFoto,
        orderNumber,
      }
    );

    return {
      ...buktiPembayaran.data.body,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
