import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { members } from "@wix/members";
import { cookies } from "next/headers";
import { orders } from "@wix/ecom";

export async function wixClientServer() {
  const cookieStore = await cookies();
  const refreshToken = JSON.parse(
    cookieStore.get("refreshToken")?.value || "{}"
  );

  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders
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

  return wixClient;
}
