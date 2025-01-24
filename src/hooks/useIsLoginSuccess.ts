"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function useIsLoginSuccess() {
  const wixClient = useWixClientContext();
  const returnedOAuthData = wixClient.auth.parseFromUrl();
  const oAuthData = JSON.parse(localStorage.getItem("oath-data") || "{}");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["memberToken"],
    queryFn: async () => {
      console.log("returnedOAuthData");
      console.log(returnedOAuthData);
      const memberTokens = await wixClient.auth.getMemberTokens(
        returnedOAuthData.code,
        returnedOAuthData.state,
        oAuthData
      );

      return memberTokens;
    },
  });

  if (returnedOAuthData.error) {
    toast.error("Login gagal");
    return { isSuccess: false };
  }

  if (isError) {
    return { isSuccess: false };
  }

  if (!isLoading && !isError) {
    console.log(data);
    Cookies.set("refreshToken", JSON.stringify(data?.refreshToken), {
      expires: 2,
    });
    if (typeof data !== "undefined") wixClient.auth.setTokens(data);
    return { isSuccess: true };
  }

  return { isSuccess: false };
}
