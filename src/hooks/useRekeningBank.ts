import { getRekeningBank } from "@/actions";
import { RekeningBankQueryType } from "@/types/rekening-bank";
import { useQuery } from "@tanstack/react-query";

export function useGetRekingBank(enable: boolean = true) {
  const { data: rekeningBank, isLoading: getRekeningBankLoading } = useQuery<
    RekeningBankQueryType[]
  >({
    queryKey: ["rekeningBank"],
    queryFn: async () => {
      try {
        const rekeningBank = await getRekeningBank();

        return rekeningBank;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    enabled: enable,
  });

  return {
    rekeningBank: !rekeningBank ? [] : [...rekeningBank],
    getRekeningBankLoading,
  };
}
