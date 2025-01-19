"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { rupiahFormatter } from "@/utils/number-formatter";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import CartItem from "./cart-item";

function CartModal() {
  const { cart, getCart, counter, isLoading } = useCartStore();
  const wixClient = useWixClientContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);

  useEffect(() => {
    getCart(wixClient);
  }, [getCart, wixClient]);

  useEffect(() => {
    const totaQty = cart.lineItems.reduce((acc, item) => {
      if (item.quantity) return acc + item.quantity;

      return acc;
    }, 0);

    setTotalCartItem(totaQty);
  }, [cart]);

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <div className="h-max bg-slate-50/50 backdrop-blur-md w-full fixed bottom-0 left-0 flex justify-between items-center gap-5 flex-wrap p-5">
      <div className="flex justify-between items-center gap-7">
        <div className="relative ">
          <IoCartOutline className="text-3xl" />

          <div className="rounded-full h-5 w-5 bg-red-500 text-slate-50 absolute left-[80%] -top-2 flex items-center justify-center">
            {counter}
          </div>
        </div>

        <div className="flex flex-col">
          <p>Total Belanja</p>
          <p className="font-semibold text-red-500 text-xl">
            {rupiahFormatter.format(
              cart.lineItems.reduce((acc, item) => {
                if (item.quantity && item.fullPrice?.amount)
                  return acc + item.quantity * +item.fullPrice.amount;

                return acc;
              }, 0)
            )}
          </p>
        </div>
      </div>

      <button
        className="h-10 w-44 bg-blue-500 flex items-center justify-center gap-1 text-slate-50 text-xl rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        <IoCartOutline />
        Checkout
      </button>

      {document.body &&
        createPortal(
          isModalOpen && (
            <>
              <div
                className="bg-slate-900/50 fixed left-0 top-0 right-0 bottom-0 z-20 cursor-pointer"
                onClick={handleClose}
              />
              <div className="bg-slate-50 px-10 py-20 min-w-64 h-fit z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-3 justify-center items-center">
                {cart.lineItems && cart.lineItems.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                      {cart.lineItems.map((item, i) => (
                        <CartItem cartItem={item} key={i} />
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 justify-center">
                      <p className="text-xl mt-3">
                        Total Harga ({totalCartItem} Produk){" "}
                        <span className="text-green-500 font-bold">
                          {cart.subtotal?.amount
                            ? rupiahFormatter.format(+cart.subtotal?.amount)
                            : 0}
                        </span>
                      </p>

                      <hr className="h-0.5 bg-slate-200 rounded-full" />

                      <div className="flex gap-3 items-center justify-between">
                        <button
                          className="border-2 border-slate-300 p-5 rounded-lg"
                          onClick={handleClose}
                        >
                          Belanja Lagi
                        </button>
                        <button
                          className={`bg-green-500 p-5 rounded-lg ${
                            isLoading ? "cursor-not-allowed" : ""
                          }`}
                        >
                          Bayar Sekarang
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <IoCartOutline className="text-[8rem]" />
                    <h3 className="text-xl text-center">
                      Keranjang Anda masih kosong
                    </h3>
                  </>
                )}
                <button
                  className="rounded-full flex items-center justify-center gap-3 w-8 h-8 bg-slate-400 absolute right-5 top-5"
                  onClick={handleClose}
                >
                  <IoClose className="text-slate-50 text-5xl" />
                </button>
                <div className="rounded-full flex items-center justify-between gap-2 absolute left-5 top-5">
                  <LuShoppingBag className="text-3xl" />
                  <p className="font-medium text-xl">Daftar Belanja Anda</p>
                </div>
              </div>
            </>
          ),
          document.body
        )}
    </div>
  );
}

export default CartModal;
