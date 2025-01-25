import { useWixClientContext } from "@/contexts/wix-context";

export function useIsLoggedIn() {
  const wixClient = useWixClientContext();
  const isLoggedIn = wixClient.auth.loggedIn();

  return { isLoggedIn };
}
