"use client";

import { useWixClientContext } from "@/contexts/wix-context";
import { useQuery } from "@tanstack/react-query";
import { members } from "@wix/members";

function useCurrentMember():
  | (members.GetMemberResponse & {
      isLoading: boolean;
    })
  | { member: null; isLoading: boolean } {
  const wixClient = useWixClientContext();

  const { data: member, isLoading } = useQuery({
    queryKey: ["currentMember"],
    queryFn: async () => {
      const isLoggedIn = wixClient.auth.loggedIn();

      if (!isLoggedIn) return null;

      const currentMember = await wixClient.members.getCurrentMember({
        fieldsets: [members.Set.EXTENDED],
      });

      return currentMember;
    },
  });

  if (!member) return { member: null, isLoading };

  return {
    member: {
      ...member.member,
    },
    isLoading,
  };
}

export default useCurrentMember;
