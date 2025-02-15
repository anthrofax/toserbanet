import { OAuthStrategy, RefreshToken, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { wixClientServer } from "./lib/wix-client-server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const urlOrigin = request.nextUrl.origin;

  const wixClient = await wixClientServer()

  if (!cookies.get("refreshToken")) {
    const tokens = await wixClient.auth.generateVisitorTokens();
    console.log(tokens);
    res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken || {}), {
      maxAge: 60 * 60  * 24 * 30,
    });
  } else {
    wixClient.auth.setTokens({
      refreshToken: JSON.parse(String(cookies.get("refreshToken")?.value)),
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    });
  }

  if (pathname.startsWith("/user")) {
    const isLoggedIn = wixClient.auth.loggedIn();
    if (!isLoggedIn) {
      console.log("not auth");
      return NextResponse.redirect(urlOrigin + "/");
    }
  }

  return res;
};
