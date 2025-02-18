import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/contexts/wix-context";
import { toast } from "react-toastify";
import { wixClientServer } from "@/lib/wix-client-server";

type CartState = {
  cart: currentCart.Cart &
    currentCart.CartNonNullableFields & {
      subtotal?: {
        amount: string;
        convertedAmount: string;
        formattedAmount: string;
        formattedConvertedAmount: string;
      };
    };
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number,
    productLink: string
  ) => void;
  updateQuantity: (
    wixClient: WixClient,
    productId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
  deleteCart: (wixClient: WixClient) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: {
    lineItems: [],
    currency: "",
    conversionCurrency: "",
    weightUnit: currentCart.WeightUnit.UNSPECIFIED_WEIGHT_UNIT,
    appliedDiscounts: [],
  },
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const isLoggedIn = wixClient.auth.loggedIn();
      if (!isLoggedIn) throw new Error("Belum login");

      const cart = await wixClient.currentCart.getCurrentCart();

      set((prev) => {
        return {
          cart: cart || prev.cart,
          isLoading: false,
          counter: cart?.lineItems.length || 0,
        };
      });
    } catch (err) {
      console.log(err);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity, productLink) => {
    set((state) => ({ ...state, isLoading: true }));

    let variant = null;

    if (!!variantId)
      variant = await wixClient.products.getStoreVariant(
        `${productId}-${variantId}`
      );

    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            options: {
              productLink,
              ...(variant && {
                variantId: variant.variant?.variantId,
                variantName: variant.variant?.variantName,
              }),
            },
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });

    toast.success("Produk berhasil ditambahkan ke keranjang.");
  },
  updateQuantity: async (wixClient, productId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response =
      await wixClient.currentCart.updateCurrentCartLineItemQuantity([
        {
          _id: productId,
          quantity,
        },
      ]);

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
  deleteCart: async (wixClient) => {
    set((state) => ({ ...state, isLoading: true }));

    const response = await wixClient.currentCart.deleteCurrentCart();

    set({
      cart: {
        lineItems: [],
        currency: "",
        conversionCurrency: "",
        weightUnit: currentCart.WeightUnit.UNSPECIFIED_WEIGHT_UNIT,
        appliedDiscounts: [],
      },
      counter: 0,
      isLoading: false,
    });
  },
}));
