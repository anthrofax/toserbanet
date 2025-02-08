import axios from "axios";
import toast from "react-hot-toast";

export const redirectToCheckout = async (checkoutData: any) => {
  console.log(checkoutData);
  try {
    const response = await axios.post(
      "/api/package-order-tokenizer",
      checkoutData
    );

    const requestData = response.data;

    // @ts-ignore
    await window!.snap.pay(requestData.token, {
      onSuccess: function (result: any) {
        // Pembayaran berhasil, arahkan ke halaman /orders
        window.location.href = "/orders";
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
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
