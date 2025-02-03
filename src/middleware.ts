import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { wixClientServer } from "./lib/wix-client-server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const urlOrigin = request.nextUrl.origin;
  const wixClient = await wixClientServer();
  const isLoggedIn = wixClient.auth.loggedIn();

  const tokens = await wixClient.auth.generateVisitorTokens();

  if (!cookies.get("refreshToken")) {
    res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken || {}), {
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  if (pathname.startsWith("/user")) {
    if (!isLoggedIn) {
      console.log("not auth");
      return NextResponse.redirect(urlOrigin + "/");
    }
  }

  return res;
};
