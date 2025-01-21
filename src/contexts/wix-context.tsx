"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENTID!,
    tokens: {
      refreshToken,
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    },
  }),
});

export type WixClient = typeof wixClient;

const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientConectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WixClientContext value={wixClient}>{children}</WixClientContext>
    </QueryClientProvider>
  );
};

export const useWixClientContext = () => {
  const context = useContext(WixClientContext);

  return context;
};
