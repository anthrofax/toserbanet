"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";
import { IoMdLogIn } from "react-icons/io";
import PrimaryButton from "./primary-button";

function LoginButton({ className }: { className?: string }) {
  const wixClient = useWixClientContext();

  async function handleLogin() {
    const loginRequestData = wixClient.auth.generateOAuthData(
      process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL!
    );

    localStorage.setItem("oath-data", JSON.stringify(loginRequestData));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);

    if (typeof window !== "undefined") {
      window.location.href = authUrl;
    } else {
      toast.error("Terjadi kesalahan saat login.");
    }
  }

  return (
    <PrimaryButton
      className={`${cn(
        className,
        "bg-blue-500 text-slate-50 transition-all hover:bg-blue-400 gap-1 rounded-none lg:rounded-full"
      )}`}
      onClick={handleLogin}
    >
      <IoMdLogIn className="text-xl" />
      <span>Masuk</span>
    </PrimaryButton>
  );
}

export default LoginButton;
