"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { formatPhoneNumber, rupiahFormatter } from "@/utils/number-formatter";
import { useEffect, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-botton";
import useCurrentMember from "@/hooks/useCurrentMember";
import CartItem from "./cart-item";
import { IoIosArrowBack } from "react-icons/io";

enum ActionType {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_STATE,
  TO_STEP_1,
  TO_STEP_2,
  PAY,
}

const initialState = {
  isModalOpen: false,
  step: 1,
  nama: "",
  nomorHp: "",
  alamat: "",
  totalCartItem: 0,
};

function CartModal() {
  const { cart, getCart, counter, isLoading } = useCartStore();
  const wixClient = useWixClientContext();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { member } = useCurrentMember();

  useEffect(() => {
    getCart(wixClient);
  }, [getCart, wixClient]);

  function cartReducer(
    prevState: typeof initialState,
    action: {
      type: ActionType;
      payload?: any;
      changedStateAttr?: keyof typeof initialState;
    }
  ): typeof initialState {
    switch (action.type) {
      case ActionType.CLOSE_MODAL:
        return initialState;
      case ActionType.OPEN_MODAL:
        return {
          ...prevState,
          isModalOpen: true,
        };
      case ActionType.SET_STATE:
        if (action.payload !== undefined && action.changedStateAttr) {
          return {
            ...prevState,
            [action.changedStateAttr]: action.payload,
          };
        }
        console.log("Payload / State Attribute belum dimasukkan ke parameter");
        return prevState;
      case ActionType.TO_STEP_1:
        return { ...initialState, isModalOpen: true, step: 1 };
      case ActionType.TO_STEP_2:
        return {
          ...prevState,
          step: 2,
          nama: member?.profile?.nickname || "",
          nomorHp:
            (member?.contact?.phones && member?.contact?.phones[0]) || "",
          alamat:
            (member?.contact &&
              member.contact.addresses &&
              member.contact.addresses[0].addressLine) ||
            "",
        };
      case ActionType.PAY:
        return prevState;
      default:
        return prevState;
    }
  }

  const [
    { alamat, isModalOpen, nama, nomorHp, step, totalCartItem },
    dispatch,
  ] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const totaQty = cart.lineItems.reduce((acc, item) => {
      if (item.quantity) return acc + item.quantity;

      return acc;
    }, 0);

    dispatch({
      type: ActionType.SET_STATE,
      changedStateAttr: "totalCartItem",
      payload: totaQty,
    });
  }, [cart]);

  return (
    <div className="shadow-lg h-max bg-slate-50/50 backdrop-blur-md w-full fixed bottom-0 left-0 flex justify-between items-center gap-5 flex-wrap p-5 z-10">
      <div className="flex justify-between items-center gap-5 lg:gap-7">
        <div className="relative ">
          <IoCartOutline className="text-3xl" />

          <div className="rounded-full h-5 w-5 bg-red-500 text-slate-50 absolute left-[80%] -top-2 flex items-center justify-center">
            {counter}
          </div>
        </div>

        <div className="flex flex-col ">
          <p>Total Belanja</p>
          <p className="font-semibold text-red-500">
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

      {isLoggedIn ? (
        <PrimaryButton
          className="text-sm md:text-xl gap-1 lg:gap-3"
          onClick={() => dispatch({ type: ActionType.OPEN_MODAL })}
        >
          <IoCartOutline />
          Checkout
        </PrimaryButton>
      ) : (
        <SecondaryButton
          className="text-sm md:text-xl gap-1 lg:gap-3"
          onClick={() => dispatch({ type: ActionType.OPEN_MODAL })}
        >
          <IoCartOutline />
          Checkout
        </SecondaryButton>
      )}

      {typeof window !== "undefined" &&
        createPortal(
          <>
            <div
              className={`bg-slate-900/50 fixed left-0 top-0 right-0 bottom-0 cursor-pointer transition-all ${
                isModalOpen ? "opacity-100 z-20" : "opacity-0 -z-10"
              }`}
              onClick={() => {
                dispatch({ type: ActionType.CLOSE_MODAL });
              }}
            />
            <div
              className={`bg-slate-50 px-10 pb-5 pt-16 min-[325px]:pt-10 md:pt-16 w-[90%] max-w-[535px] h-fit fixed top-1/2 left-1/2 -translate-x-1/2 rounded-xl flex flex-col gap-3 justify-center items-center duration-500 delay-75 ${
                isModalOpen
                  ? "-translate-y-1/2 opacity-100 z-30"
                  : "-translate-y-1/4 opacity-0 -z-10"
              }`}
            >
              {step === 1 ? (
                cart.lineItems && cart.lineItems.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto scrollbar pr-1 mt-3">
                      {cart.lineItems.map((item, i) => (
                        <CartItem cartItem={item} key={i} />
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 justify-center text-center md:text-start">
                      <p className="text-base md:text-base mt-3">
                        Total Harga ({totalCartItem} Produk){" "}
                        <span className="text-green-500 font-bold text-lg">
                          {cart.subtotal?.amount
                            ? rupiahFormatter.format(+cart.subtotal?.amount)
                            : 0}
                        </span>
                      </p>

                      <hr className="h-0.5 bg-slate-200 rounded-full" />

                      <div className="flex gap-3 flex-col md:flex-row items-center justify-between text-xs lg:text-base">
                        <button
                          className="border-2 border-slate-300 w-full p-5 rounded-lg"
                          onClick={() =>
                            dispatch({ type: ActionType.CLOSE_MODAL })
                          }
                        >
                          Belanja Lagi
                        </button>
                        <button
                          className={`bg-green-500 p-5 rounded-lg w-full ${
                            isLoading ? "cursor-not-allowed" : ""
                          }`}
                          onClick={() =>
                            dispatch({ type: ActionType.TO_STEP_2 })
                          }
                        >
                          Lanjut
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
                )
              ) : null}

              {step === 2 && (
                <div className="mt-3 grid grid-cols-8 gap-x-2 gap-y-3">
                  <label htmlFor="nama" className="col-span-2 cursor-pointer">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    className="col-span-6 bg-slate-200 rounded-lg h-12 p-2 placeholder:text-slate-500"
                    id="nama"
                    placeholder="Contoh: Andi Kusuma)"
                    value={nama}
                    onChange={(e) => {
                      dispatch({
                        type: ActionType.SET_STATE,
                        changedStateAttr: "nama",
                        payload: e.target.value,
                      });
                    }}
                  />
                  <label
                    htmlFor="nomorHp"
                    className="col-span-2 cursor-pointer"
                  >
                    Nomor HP
                  </label>
                  <input
                    type="tel"
                    className="col-span-6 bg-slate-200 rounded-lg h-12 p-2"
                    id="nomorHp"
                    placeholder="Contoh: 628xxxxx...)"
                    value={nomorHp}
                    onChange={(e) => {
                      const input = e.target.value;
                      const cleanedPhone = input.replace(/\D/g, "");

                      if (cleanedPhone.length === 0) {
                        dispatch({
                          type: ActionType.SET_STATE,
                          changedStateAttr: "nomorHp",
                          payload: "",
                        });
                        return;
                      }

                      // Pastikan hanya memproses nomor dengan awalan '62'
                      if (cleanedPhone.startsWith("62")) {
                        dispatch({
                          type: ActionType.SET_STATE,
                          changedStateAttr: "nomorHp",
                          payload: formatPhoneNumber(cleanedPhone),
                        });
                        console.log(formatPhoneNumber(cleanedPhone));
                        console.log(nomorHp);
                      } else {
                        dispatch({
                          type: ActionType.SET_STATE,
                          changedStateAttr: "nomorHp",
                          payload: cleanedPhone,
                        });
                        console.log("test");
                      }
                    }}
                  />
                  <label htmlFor="alamat" className="col-span-2 cursor-pointer">
                    Alamat Lengkap
                  </label>
                  <textarea
                    className="col-span-6 bg-slate-200 rounded-lg h-20 p-2"
                    id="alamat"
                    placeholder="(Contoh: Jl. Gatot Subroto No.42 .....)"
                    onChange={(e) => {
                      dispatch({
                        type: ActionType.SET_STATE,
                        changedStateAttr: "alamat",
                        payload: e.target.value,
                      });
                    }}
                    value={alamat}
                  />

                  <button className="bg-blue-500 rounded-lg p-3 text-slate-50 col-span-8 transition-all hover:bg-blue-600">
                    Bayar Sekarang
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center gap-3 flex-wrap">
                <button
                  className="rounded-full p-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-slate-400 hover:bg-slate-500 absolute right-5 top-5"
                  onClick={() => {
                    dispatch({ type: ActionType.CLOSE_MODAL });
                  }}
                >
                  <IoClose className="text-slate-50 text-5xl" />
                </button>
                {step === 2 && (
                  <button
                    className="rounded-full p-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-slate-400 hover:bg-slate-500 absolute right-16 top-5"
                    onClick={() => {
                      dispatch({ type: ActionType.TO_STEP_1 });
                    }}
                  >
                    <IoIosArrowBack className="text-slate-50 text-5xl" />
                  </button>
                )}
                <div className="rounded-full flex items-center gap-2 absolute left-5 top-5 w-[70%]">
                  <LuShoppingBag className="text-2xl md:text-3xl" />
                  <p className="font-medium text-base md:text-xl">
                    {false ? " Daftar Belanja Anda" : "Data Pemesanan"}
                  </p>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}

export default CartModal;
