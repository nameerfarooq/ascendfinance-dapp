import { useCallback } from "react";

import { type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import SortedTroves_ABI from "@/abis/SortedTroves.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useSortedTroves = (): {
  findInsertPosition: (
    sortedTrovesAddress: Address,
    NICR: bigint,
    prevId: Address,
    nextId: Address,
  ) => Promise<Address[]>;
} => {
  const { isConnected, address } = useAccount();

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
          publicClient &&
          sortedTrovesAddress &&
          NICR &&
          prevId &&
          nextId
        ) {
          const result = await readContract(publicClient, {
            abi: SortedTroves_ABI.abi,
            account: address,
            address: sortedTrovesAddress,
            functionName: "findInsertPosition",
            args: [NICR, prevId, nextId],
          });

          return result as Address[];
        } else {
          console.log("123", {
            isConnected,
            address,
            publicClient,
            sortedTrovesAddress,
            NICR,
            prevId,
            nextId,
          });
          return ["0x"];
        }
      } catch (error) {
        console.log("findInsertPosition(): ", error);
        return ["0x"];
      }
    },
    [isConnected, address],
  );

  return {
    findInsertPosition,
  };
};

export default useSortedTroves;
