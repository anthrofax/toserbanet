"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useCartStore } from "@/hooks/useCartStore";
import { formatPhoneNumber, rupiahFormatter } from "@/utils/number-formatter";
import React, { useEffect, useReducer, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import PrimaryButton from "../primary-button";
import SecondaryButton from "../secondary-botton";
import useCurrentMember from "@/hooks/useCurrentMember";
import CartItem from "../cart-item";
import ProvinceSelect from "./dropdown-provinsi";
import DropdownCity from "./dropdown-city";
import DropdownDistrict from "./dropdown-district";
import DropdownKurir from "./dropdown-kurir";
import { redirectToCheckout } from "@/lib/redirect-to-checkout";
import { orders } from "@wix/ecom";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { CheckoutLineItemType } from "@/types/checkout-types";
import { Modal } from "../modal";
import {
  ActionType,
  cartReducer,
  initialState,
  modalIconMap,
  modalTitleMap,
} from "./modal-data";
import { useMidtransInit } from "@/hooks/useMidtransInit";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "../confirmation.box";
import { MdOutlineInfo } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import PaymentPage from "../payment-page";
import { useMutatePaymentEvidence } from "@/hooks/useMutatePaymentEvidence";

function CartModal() {
  const { cart, getCart, counter, isLoading } = useCartStore();
  const wixClient = useWixClientContext();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { member } = useCurrentMember();
  const pathname = usePathname();
  const router = useRouter();

  useMidtransInit();

  useEffect(() => {
    getCart(wixClient);
  }, [getCart, wixClient, isLoggedIn]);

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
      ongkir,
      layananKurir,
      errors,
      isValidToValidate,
      buktiTf,
      createdOrderId,
    },
    dispatch,
  ] = useReducer(cartReducer, initialState);

  const { mutate: triggerCreateOrder, isPending: createOrderPending } =
    useMutation({
      mutationKey: ["newOrder"],
      mutationFn: async () => {
        if (!isLoggedIn)
          return toast.error(
            "Untuk melanjutkan, silahkan login terlebih dahulu"
          );

        if (Object.values(errors).some((error) => error))
          return toast.error(
            "Data yang anda masukkan masih ada yang tidak sesuai."
          );

        const createdOrder = await redirectToCheckout(
          {
            informasiPembeli: {
              memberId: member?._id || "",
              contactId: member?.contactId || "",
              nama: member?.profile?.nickname || "",
              nomorHp:
                (member?.contact?.phones && member?.contact?.phones[0]) ||
                nomorHp,
              email: member?.loginEmail || "",
            },
            alamat: `${alamat}, ${kecamatan}, ${kota.split(";")[1]}, ${
              provinsi.split(";")[1]
            }.`,
            catatan,
            lineItems: cart.lineItems.map((item, i) => {
              const sentItem: CheckoutLineItemType = {
                id: item?._id || "",
                itemType:
                  item.itemType?.preset || orders.ItemTypeItemType.PHYSICAL,
                price: item.price?.amount ? +item.price.amount : 0,
                productName: item.productName?.original || "",
                quantity: item.quantity || 0,
                image: item.image || "",
                weight: item.physicalProperties?.weight
                  ? item.physicalProperties.weight
                  : 0,
                catalogReference: {
                  appId: item.catalogReference?.appId || "",
                  catalogItemId: item.catalogReference?.catalogItemId || "",
                  options: {
                    productLink:
                      item.catalogReference?.options?.productLink || null,
                  },
                },
              };

              if (
                item.catalogReference?.options &&
                item.catalogReference?.options?.variantId
              ) {
                sentItem.catalogReference.options = {
                  ...sentItem.catalogReference.options,
                  variantId: item.catalogReference?.options.variantId || null,
                  variantName:
                    item.catalogReference?.options.variantName || null,
                };
              }

              return sentItem;
            }),
            ongkir,
            layananKurir,
          },
          member?.contactId || "",
          false
        );

        console.log(createdOrder);

        dispatch({
          type: ActionType.TO_STEP_3,
          payload: { orderId: createdOrder?._id || "" },
        });

        // clearcart
      },
    });

  useEffect(() => {
    console.log(step, isValidToValidate);
    if (step === 2 && isValidToValidate) triggerCreateOrder();
  }, [isValidToValidate]);

  useEffect(() => {
    if (isValidToValidate) dispatch({ type: ActionType.VALIDATE_FORM });
  }, [
    alamat,
    nama,
    nomorHp,
    provinsi,
    kota,
    kecamatan,
    kurir,
    layananKurir,
    isValidToValidate,
  ]);

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

  useEffect(() => {
    if (totalCartItem === 0) {
      dispatch({ type: ActionType.TO_STEP_1 });
    }
  }, [totalCartItem]);

  const { mutatePaymentEvidence, mutatePaymentEvidencePending } =
    useMutatePaymentEvidence();

  if (/^\/user\/[^\/]+\/transactions\/[^\/]+$/.test(pathname)) {
    return null;
  }

  return (
    <div className="shadow-lg h-max bg-slate-50/50 backdrop-blur-md w-full sticky bottom-0 left-0 flex justify-between items-center gap-5 flex-wrap p-5 z-10">
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

      <Modal
        handleClose={() => dispatch({ type: ActionType.CLOSE_MODAL })}
        handleOpen={() => dispatch({ type: ActionType.OPEN_MODAL })}
        isOpen={isModalOpen}
      >
        <Modal.Open>
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
        </Modal.Open>

        <Modal.OpenedModal
          modalIcon={React.createElement(modalIconMap.get(step)!, {
            className: "text-2xl md:text-3xl shrink-0",
          })}
          modalTitle={modalTitleMap.get(step) || modalTitleMap.get(1)!}
        >
          {mutatePaymentEvidencePending || createOrderPending ? (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg h-full top-0 bg-slate-50/50 z-10">
              <div className="loader"></div>
            </div>
          ) : null}
          {step === 2 && (
            <div className="mt-16 min-[320px]:mt-8 md:mt-3 grid grid-cols-8 gap-x-2 gap-y-3 overflow-x-auto text-xs min-[500px]:text-sm sm:text-base w-full scrollbar px-1 h-max">
              <div className="input-data">
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
                {errors.nama && (
                  <p className="validation-error-message">{errors.nama}</p>
                )}
              </div>
              <div className="input-data">
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
                    } else {
                      dispatch({
                        type: ActionType.SET_STATE,
                        changedStateAttr: "nomorHp",
                        payload: cleanedPhone,
                      });
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
                {errors.nomorHp && (
                  <p className="validation-error-message">{errors.nomorHp}</p>
                )}
              </div>
              <div className="relative col-span-8 flex flex-col gap-2">
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
                {errors.alamat && (
                  <p className="validation-error-message">{errors.alamat}</p>
                )}
              </div>

              <ProvinceSelect
                value={provinsi}
                onChange={(val) => {
                  dispatch({
                    type: ActionType.CHOOSE_PROVINCE,
                    payload: val,
                  });
                }}
                validationErrorMessage={errors.provinsi}
              />

              <DropdownCity
                value={kota}
                onChange={(val) => {
                  dispatch({
                    type: ActionType.CHOOSE_CITY,
                    payload: val,
                  });
                }}
                provinsi={provinsi}
                validationErrorMessage={errors.kota}
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
                validationErrorMessage={errors.kecamatan}
              />

              <DropdownKurir
                isDisabled={!provinsi || !kota || !kecamatan}
                kurir={kurir}
                kecamatan={kecamatan}
                ongkir={ongkir}
                onChangeKurir={async (val) => {
                  dispatch({
                    type: ActionType.CHOOSE_KURIR,
                    payload: val,
                  });
                }}
                courierValidationErrorMessage={errors.kurir}
                onChangeLayananKurir={async (val: string) => {
                  dispatch({
                    type: ActionType.CHOOSE_COURIER_SERVICE,
                    payload: val,
                  });
                }}
                courierServiceValidationErrorMessage={errors.layananKurir}
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

          {step === 3 && <PaymentPage orderId={createdOrderId} />}

          {step < 3 ? (
            cart.lineItems && cart.lineItems.length > 0 ? (
              <>
                <div
                  className={`flex flex-col gap-3 overflow-y-auto scrollbar pr-1 mt-3 w-full ${
                    step === 2 ? "max-h-40" : "max-h-96"
                  }`}
                >
                  {cart.lineItems.map((item, i) => (
                    <CartItem cartItem={cart.lineItems[i]} key={i} />
                  ))}
                </div>
              </>
            ) : (
              <div className="my-16 flex flex-col gap-3 items-center">
                <IoCartOutline className="text-[5rem] md:text-[7rem]" />
                <h3 className=" md:text-xl text-center">
                  Keranjang Anda masih kosong
                </h3>
              </div>
            )
          ) : null}

          <div className="flex flex-col gap-2 justify-center items-center text-center md:text-start w-full">
            {step < 3 && (
              <div className="text-center space-y-2 divide-y-2 divide-slate-300">
                <div className="space-y-1">
                  <p className="text-sm md:text-base">
                    Sub Total Harga ({totalCartItem} Produk){" "}
                    <span className="text-green-500 font-bold text-sm">
                      {cart.subtotal?.amount
                        ? rupiahFormatter.format(+cart.subtotal?.amount)
                        : rupiahFormatter.format(0)}
                    </span>
                  </p>
                  {ongkir > 0 && (
                    <p className="text-sm md:text-base">
                      Ongkos Kirim{" "}
                      <span className="text-green-500 font-bold text-sm">
                        {rupiahFormatter.format(ongkir)}
                      </span>
                    </p>
                  )}
                </div>

                {cart.subtotal?.amount && ongkir ? (
                  <p className="text-base md:text-base">
                    Total{" "}
                    <span className="text-green-500 font-bold text-lg">
                      {rupiahFormatter.format(+cart.subtotal?.amount + ongkir)}
                    </span>
                  </p>
                ) : null}
              </div>
            )}

            <hr className="h-0.5 bg-slate-200 rounded-full" />

            <div className="flex gap-3 flex-col md:flex-row items-center justify-between text-xs lg:text-sm w-full">
              {step === 1 && (
                <>
                  <button
                    className="border-2 border-slate-300 w-full p-3 rounded-lg"
                    onClick={() => dispatch({ type: ActionType.CLOSE_MODAL })}
                  >
                    Belanja Lagi
                  </button>
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg w-full text-slate-50 ${
                      isLoading ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: ActionType.TO_STEP_2_FROM_1,
                        payload: {
                          defaultName: member?.profile?.nickname || "",
                          defaultPhone:
                            (member?.contact?.phones &&
                              member?.contact?.phones[0]) ||
                            "",
                          defaultAddress:
                            (member?.contact &&
                              member.contact?.addresses &&
                              member.contact.addresses[0]?.addressLine) ||
                            "",
                        },
                      })
                    }
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
                    className={`w-full bg-blue-500 rounded-lg p-3 text-slate-50 col-span-8 transition-all hover:bg-blue-600`}
                    onClick={async () => {
                      if (!!buktiTf) return dispatch({ type: ActionType.PAY });

                      confirmAlert({
                        customUI: ({ onClose }: { onClose: () => void }) => {
                          return (
                            <ConfirmationBox
                              icon={<MdOutlineInfo />}
                              judul="Konfirmasi Data"
                              pesan="Apakah data pemesanan yang anda masukkan sudah benar?"
                              onClose={onClose}
                              onClickIya={async () => {
                                dispatch({ type: ActionType.PAY });
                              }}
                              labelIya="Sudah"
                              labelTidak="Hmm, sebentar."
                              yesButtonClassName="bg-blue-500 text-slate-50"
                            />
                          );
                        },
                      });
                    }}
                  >
                    Lanjut Pembayaran
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <button
                    className={`w-full bg-blue-500 rounded-lg p-3 text-slate-50 col-span-8 transition-all hover:bg-blue-600`}
                    onClick={async () => {
                      router.push(
                        `/user/${member?.profile?.slug}/transactions`
                      );
                    }}
                  >
                    Ke Halaman Transaksi
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal.OpenedModal>
      </Modal>
    </div>
  );
}

export default CartModal;
