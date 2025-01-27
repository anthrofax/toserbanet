// "use client";

// import { useWixClientContext } from "@/contexts/wix-context";
// import { useQuery } from "@tanstack/react-query";
// import { members } from "@wix/members";

// function useCurrentMember(): members.GetMemberResponse | { member: null } {
//   const wixClient = useWixClientContext();

//   const { data: member } = useQuery({
//     queryKey: ["currentOrders"],
//     queryFn: async () => {
//       const currentMember = await wixClient.members.getCurrentMember({
//         fieldsets: [members.Set.EXTENDED],
//       });

//       return currentMember;
//     },
//   });

//   if (!member) return { member: null };

//   return member;
// }

// export default useCurrentMember;