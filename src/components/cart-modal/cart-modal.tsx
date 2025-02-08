"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { formatPhoneNumber, rupiahFormatter } from "@/utils/number-formatter";
import { useEffect, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import PrimaryButton from "../primary-button";
import SecondaryButton from "../secondary-botton";
import useCurrentMember from "@/hooks/useCurrentMember";
import CartItem from "../cart-item";
import { IoIosArrowBack } from "react-icons/io";
import ProvinceSelect from "./dropdown-provinsi";
import DropdownCity from "./dropdown-city";
import DropdownDistrict from "./dropdown-district";
import DropdownKurir from "./dropdown-kurir";
import DropdownPostcode from "./dropdown-postcode";
import { redirectToCheckout } from "@/lib/redirect-to-checkout";
import { orders } from "@wix/ecom";

enum ActionType {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_STATE,
  TO_STEP_1,
  TO_STEP_2,
  PAY,
  CHOOSE_PROVINCE,
  CHOOSE_CITY,
  CHOOSE_DISTRICT,
  CHOOSE_POSTCODE,
  CHOOSE_KURIR,
}

const initialState = {
  isModalOpen: false,
  step: 1,
  nama: "",
  nomorHp: "",
  alamat: "",
  catatan: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  kurir: "",
  kodepos: "",
  ongkir: 0,
  totalCartItem: 0,
};

function CartModal() {
  const { cart, getCart, counter, isLoading } = useCartStore();
  const wixClient = useWixClientContext();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { member } = useCurrentMember();

  useEffect(() => {
    const snapScript = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL as string;
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT as string;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        return { ...initialState, totalCartItem: prevState.totalCartItem };
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
        return {
          ...prevState,
          step: 1,
        };
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
      case ActionType.CHOOSE_PROVINCE:
        return {
          ...prevState,
          provinsi: action.payload,
          kota: "",
          kecamatan: "",
          kodepos: "",
          kurir: "",
          ongkir: 0,
        };
      case ActionType.CHOOSE_CITY:
        return {
          ...prevState,
          kota: action.payload,
          kecamatan: "",
          kodepos: "",
          kurir: "",
          ongkir: 0,
        };
      case ActionType.CHOOSE_DISTRICT:
        return {
          ...prevState,
          kecamatan: action.payload,
          kodepos: "",
          kurir: "",
          ongkir: 0,
        };
      case ActionType.CHOOSE_POSTCODE:
        return {
          ...prevState,
          kodepos: action.payload,
          kurir: "",
          ongkir: 0,
        };
      case ActionType.CHOOSE_KURIR:
        return {
          ...prevState,
          kurir: action.payload,
          ongkir: 0,
        };
      case ActionType.PAY:
        return prevState;
      default:
        return prevState;
    }
  }

  const [
    {
      alamat,
      isModalOpen,
      nama,
      nomorHp,
      step,
      totalCartItem,
      catatan,
      provinsi,
      kota,
      kecamatan,
      kurir,
      kodepos,
      ongkir,
    },
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
              className={`bg-slate-50 px-3 md:px-10 pb-5 py-16 min-[325px]:pt-10 md:pt-16 w-[90%] max-w-[535px] h-fit fixed top-1/2 left-1/2 -translate-x-1/2 rounded-xl flex flex-col gap-3 justify-center items-center max-h-[90vh] ${
                isModalOpen
                  ? "-translate-y-1/2 opacity-100 z-30 duration-500 delay-75"
                  : "-translate-y-1/4 opacity-0 -z-10"
              }`}
            >
              <div className="flex justify-between items-center gap-3 flex-wrap will-change-transform absolute top-5 w-full px-5">
                <div className="rounded-full flex items-center gap-2 w-[70%]">
                  <LuShoppingBag className="text-2xl md:text-3xl shrink-0" />
                  <p className="font-medium text-base md:text-xl">
                    {step === 1 ? " Daftar Belanja Anda" : "Data Pemesanan"}
                  </p>
                </div>

                <button
                  className="rounded-full p-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-slate-400 hover:bg-slate-500"
                  onClick={() => {
                    dispatch({ type: ActionType.CLOSE_MODAL });
                  }}
                >
                  <IoClose className="text-slate-50 text-5xl" />
                </button>
              </div>

              {step === 2 && (
                <div className="mt-16 min-[320px]:mt-8 md:mt-3 grid grid-cols-8 gap-x-2 gap-y-3 overflow-x-auto text-xs min-[500px]:text-sm sm:text-base w-full scrollbar px-1">
                  <div className="relative col-span-4">
                    <input
                      type="text"
                      className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-end outline-none rounded-lg text-sm focus:border-slate-500 ${
                        nama ? "pt-5" : "pt-3"
                      }`}
                      id="nama"
                      placeholder="Nama Penerima"
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
                      htmlFor="alamat"
                      className={`absolute transition-all duration-200 text-slate-400 ${
                        nama ? "text-xs top-1.5 left-4" : "hidden"
                      }`}
                    >
                      Nama Penerima
                    </label>
                  </div>
                  <div className="relative col-span-4">
                    <input
                      type="tel"
                      className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-end outline-none rounded-lg text-sm focus:border-slate-500 ${
                        nomorHp ? "pt-5" : "pt-3"
                      }`}
                      id="nomorHp"
                      placeholder="Nomor Telepon"
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
                    <label
                      htmlFor="alamat"
                      className={`absolute transition-all duration-200 text-slate-400 ${
                        nomorHp ? "text-xs top-1.5 left-4" : "hidden"
                      }`}
                    >
                      Nomor Telepon
                    </label>
                  </div>
                  <div className="relative col-span-8">
                    <textarea
                      className={`w-full bg-transparent border-2 border-slate-300 h-20 p-2 pl-4 pt-6 flex items-end resize-none outline-none rounded-lg text-sm focus:border-slate-500`}
                      id="alamat"
                      onChange={(e) => {
                        dispatch({
                          type: ActionType.SET_STATE,
                          changedStateAttr: "alamat",
                          payload: e.target.value,
                        });
                      }}
                      value={alamat}
                      placeholder="Nama Jalan, Gedung, No. Rumah"
                    />
                    <label
                      htmlFor="alamat"
                      className={`absolute transition-all duration-200 text-slate-400 ${
                        alamat ? "text-xs top-1.5 left-4" : "hidden"
                      }`}
                    >
                      Nama Jalan, Gedung, No. Rumah
                    </label>
                  </div>

                  <ProvinceSelect
                    value={provinsi}
                    onChange={(val) => {
                      dispatch({
                        type: ActionType.CHOOSE_PROVINCE,
                        payload: val,
                      });
                    }}
                  />

                  <DropdownCity
                    value={kota}
                    onChange={(val) => {
                      dispatch({
                        type: ActionType.CHOOSE_CITY,
                        payload: val,
                      });
                    }}
                    idProvinsi={provinsi}
                  />

                  <DropdownDistrict
                    value={kecamatan}
                    onChange={(val) => {
                      dispatch({
                        type: ActionType.CHOOSE_DISTRICT,
                        payload: val,
                      });
                    }}
                    kota={kota}
                  />

                  <DropdownPostcode
                    value={kodepos}
                    district={kecamatan}
                    onChange={(val) => {
                      dispatch({
                        type: ActionType.CHOOSE_POSTCODE,
                        payload: val,
                      });
                    }}
                  />

                  <DropdownKurir
                    isDisabled={!provinsi || !kota || !kecamatan}
                    kurir={kurir}
                    kodePosTujuan={kodepos}
                    ongkir={ongkir}
                    onChangeKurir={async (val) => {
                      dispatch({
                        type: ActionType.CHOOSE_KURIR,
                        payload: val,
                      });
                    }}
                    onChangeLayananKurir={async (val: string) => {
                      dispatch({
                        type: ActionType.SET_STATE,
                        changedStateAttr: "ongkir",
                        payload: +val,
                      });
                    }}
                  />

                  <div className="relative col-span-8">
                    <input
                      className={`w-full bg-transparent border-2 border-slate-300 pl-4 pb-3 flex items-end outline-none rounded-lg text-sm focus:border-slate-500 ${
                        catatan ? "pt-5" : "pt-3"
                      }`}
                      id="catatan"
                      onChange={(e) => {
                        dispatch({
                          type: ActionType.SET_STATE,
                          changedStateAttr: "catatan",
                          payload: e.target.value,
                        });
                      }}
                      value={catatan}
                      placeholder="Catatan"
                    />
                    <label
                      htmlFor="catatan"
                      className={`absolute transition-all duration-200 text-slate-400 ${
                        catatan ? "text-xs top-1.5 left-4" : "hidden"
                      }`}
                    >
                      Catatan
                    </label>
                  </div>
                </div>
              )}

              {cart.lineItems && cart.lineItems.length > 0 ? (
                <>
                  <div
                    className={`flex flex-col gap-3 overflow-y-auto scrollbar pr-1 mt-3 w-full ${
                      step === 2 ? "max-h-40" : "max-h-96"
                    }`}
                  >
                    {cart.lineItems.map((item, i) => (
                      <CartItem cartItem={item} key={i} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="my-16 flex flex-col gap-3 items-center">
                  <IoCartOutline className="text-[3rem] md:text-[7rem]" />
                  <h3 className=" md:text-xl text-center">
                    Keranjang Anda masih kosong
                  </h3>
                </div>
              )}

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

                <div className="flex gap-3 flex-col md:flex-row items-center justify-between text-xs lg:text-sm">
                  {step === 1 && (
                    <>
                      <button
                        className="border-2 border-slate-300 w-full p-3 rounded-lg"
                        onClick={() =>
                          dispatch({ type: ActionType.CLOSE_MODAL })
                        }
                      >
                        Belanja Lagi
                      </button>
                      <button
                        className={`bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg w-full text-slate-50 ${
                          isLoading ? "cursor-not-allowed" : ""
                        }`}
                        onClick={() => dispatch({ type: ActionType.TO_STEP_2 })}
                      >
                        Lanjut
                      </button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <button
                        className="border-2 border-slate-300 w-full p-3 rounded-lg"
                        onClick={() => dispatch({ type: ActionType.TO_STEP_1 })}
                      >
                        Kembali
                      </button>
                      <button
                        className={`w-full bg-blue-500 rounded-lg p-3 text-slate-50 col-span-8 transition-all hover:bg-blue-600 md:mt-3`}
                        onClick={async () => {
                          console.log("test");
                          await redirectToCheckout(
                            {
                              nama: member?.profile?.nickname || "",
                              nomorHp:
                                (member?.contact?.phones &&
                                  member?.contact?.phones[0]) ||
                                "",
                              email: member?.loginEmail || "",
                              alamat,
                              catatan,
                              lineItems: cart.lineItems.map((item) => {
                                return {
                                  id: item?._id || "",
                                  itemType: orders.ItemTypeItemType.PHYSICAL,
                                  price: item.price?.amount
                                    ? +item.price.amount
                                    : 0,
                                  productName: item.productName?.original || "",
                                  quantity: item.quantity || 0,
                                  image: item.image || "",
                                  weight: item.physicalProperties?.weight
                                    ? item.physicalProperties.weight * 1000
                                    : 0,
                                };
                              }),
                              ongkir,
                            },
                            member?.contactId || ""
                          );
                        }}
                      >
                        Bayar Sekarang
                      </button>
                    </>
                  )}
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
