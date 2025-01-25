"use client";

import LoginButton from "./login-button";
import UserDropdown from "./user-dropdown";
import { useWixClientContext } from "@/contexts/wix-context";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useIsLoginSuccess } from "@/hooks/useIsLoginSuccess";

function LoginElements() {
  const wixClient = useWixClientContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { isSuccess, isLoading } = useIsLoginSuccess();
  useEffect(() => {
    setIsLoggedIn(wixClient.auth.loggedIn());
  }, [isSuccess]);

  if (isLoading && isLoggedIn === false)
    return (
      <Skeleton className="w-8 bg-slate-300/50 aspect-square rounded-full hidden lg:block" />
    );

  if (!isLoggedIn && !isLoading)
    return <LoginButton className="hidden lg:flex" />;

  return (
    <div className="hidden lg:block">
      <UserDropdown />
    </div>
  );
}

export default LoginElements;
