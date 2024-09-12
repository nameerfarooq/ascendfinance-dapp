import { useCallback } from "react";

import { type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import SortedTroves_ABI from "@/abis/SortedTroves.json";

export const useSortedTroves = (): {
  findInsertPosition: (
    sortedTrovesAddress: Address,
    NICR: bigint,
    prevId: Address,
    nextId: Address,
  ) => Promise<Address[]>;
} => {
  const publicClient = usePublicClient();
  const { isConnected, address, chain } = useAccount();

  const findInsertPosition = useCallback(
    async (
      sortedTrovesAddress: Address,
      NICR: bigint,
      prevId: Address,
      nextId: Address,
    ): Promise<Address[]> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          sortedTrovesAddress &&
          NICR &&
          prevId &&
          nextId
        ) {
          const result = await publicClient?.readContract({
            abi: SortedTroves_ABI.abi,
            account: address,
            address: sortedTrovesAddress,
            functionName: "findInsertPosition",
            args: [NICR, prevId, nextId],
          });

          return result as Address[];
        } else {
          return ["0x"];
        }
      } catch (error) {
        console.log("findInsertPosition(): ", error);
        return ["0x"];
      }
    },
    [isConnected, address, chain, publicClient],
  );

  return {
    findInsertPosition,
  };
};

export default useSortedTroves;
