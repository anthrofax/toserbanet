"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function useIsLoginSuccess() {
  const wixClient = useWixClientContext();
  const returnedOAuthData =
    typeof window !== "undefined" ? wixClient.auth.parseFromUrl() : null;
  const oAuthData = JSON.parse(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("oath-data") || "{}"
      : "{}"
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["memberToken"],
    queryFn: async () => {
      if (!returnedOAuthData) throw new Error("window is not defined");

      const memberTokens = await wixClient.auth.getMemberTokens(
        returnedOAuthData.code,
        returnedOAuthData.state,
        oAuthData
      );

      return memberTokens;
    },
  });

  if (!returnedOAuthData || returnedOAuthData.error) {
    toast.error("Login gagal");
    return { isSuccess: false, isLoading };
  }

  if (isError) {
    return { isSuccess: false, isLoading };
  }

  if (!isLoading && !isError) {
    Cookies.set("refreshToken", JSON.stringify(data?.refreshToken || {}), {
      expires: 2,
    });
    if (typeof data !== "undefined") wixClient.auth.setTokens(data);
    return { isSuccess: true, isLoading };
  }

  return { isSuccess: false, isLoading };
}
