import { orderTokenizer } from "@/actions";
import { CheckoutDataType } from "@/types/checkout-types";
import { orders } from "@wix/ecom";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrder } from "./order";

export const redirectToCheckout = async (
  checkoutData: CheckoutDataType,
  userId: string,
  toMidtrans: boolean = false
) => {
  console.log(checkoutData);
  try {
    // const response = await orderTokenizer(checkoutData);
    if (toMidtrans) {
      const response = await orderTokenizer(checkoutData);

      console.log(response);

      // @ts-ignore
      await window!.snap.pay(response.token, {
        onSuccess: function (result: any) {
          // Pembayaran berhasil, arahkan ke halaman /orders
          window.location.href = `/user/${userId}/transactions`;
        },
        onPending: function (result: any) {
          // Pembayaran dalam status pending
          toast.error("Pembayaran dibatalkan");
        },
        onError: function (result: any) {
          // Tangani kesalahan pembayaran
          toast.error("Pembayaran tidak valid");
        },
        onClose: function () {
          // Pengguna menutup popup pembayaran
          toast.error("Pembayaran dibatalkan");
        },
      });
    } else {
      const createdOrder = await createOrder(checkoutData);

      return createdOrder;
    }
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
