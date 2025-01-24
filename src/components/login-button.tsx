"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useIsLoginSuccess } from "@/hooks/useIsLoginSuccess";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";

function LoginButton({ className }: { className?: string }) {
  const wixClient = useWixClientContext();
  const { isSuccess } = useIsLoginSuccess();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { replace } = useRouter();

  useEffect(() => {
    if (isLoggedIn) replace("/");
  }, [isSuccess, isLoggedIn]);

  async function handleLogin() {
    const loginRequestData = wixClient.auth.generateOAuthData(
      process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL!
    );

    console.log(loginRequestData);
    localStorage.setItem("oath-data", JSON.stringify(loginRequestData));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);

    if (typeof window !== "undefined") {
      window.location.href = authUrl;
    } else {
      toast.error("Terjadi kesalahan saat login.");
    }
  }

  return (
    <button
      className={`${cn(
        className,
        "bg-blue-500 text-slate-50 transition-all hover:bg-blue-400"
      )}`}
      onClick={handleLogin}
    >
      <IoMdLogIn className="text-xl" />
      <span>Masuk</span>
    </button>
  );
}

export default LoginButton;
