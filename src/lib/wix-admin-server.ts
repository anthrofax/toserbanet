import { ApiKeyStrategy, OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { members } from "@wix/members";
import { cookies } from "next/headers";
import { orders } from "@wix/ecom";

export async function wixAdminServer() {
  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders,
    },
    auth: ApiKeyStrategy({
      apiKey: process.env.WIX_SECRET_API_KEY!,
      siteId: process.env.NEXT_PUBLIC_SITE_ID!,
      accountId: process.env.NEXT_PUBLIC_ACCOUNT_ID!,
    }),
  });

  return wixClient;
}
