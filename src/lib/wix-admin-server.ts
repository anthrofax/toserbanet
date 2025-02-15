import { ApiKeyStrategy, OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { members } from "@wix/members";
import { orders } from "@wix/ecom";
import { collections as wixCollections } from "@wix/data";

export async function wixAdminServer() {
  const wixClient = createClient({
    modules: {
      products,
      collections,
      members,
      orders,
      wixCollections,
    },
    auth: ApiKeyStrategy({
      apiKey: process.env.WIX_SECRET_API_KEY!,
      siteId: process.env.SITE_ID!,
      accountId: process.env.ACCOUNT_ID!,
    }),
  });

  return wixClient;
}
