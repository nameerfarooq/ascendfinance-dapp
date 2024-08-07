import { useCallback } from "react";

import { createWalletClient, custom, type Address } from "viem";
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
  ) => Promise<Address[] | void>;
} => {
  const { isConnected, address } = useAccount();

  const findInsertPosition = useCallback(
    async (
      sortedTrovesAddress: Address,
      NICR: bigint,
      prevId: Address,
      nextId: Address,
    ): Promise<Address[] | void> => {
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
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const result = await readContract(walletClient, {
            abi: SortedTroves_ABI.abi,
            account: address,
            address: sortedTrovesAddress,
            functionName: "findInsertPosition",
            args: [NICR, prevId, nextId],
          });

          return result as Address[];
        }
      } catch (error) {
        console.log("findInsertPosition(): ", error);
      }
    },
    [isConnected, address],
  );

  return {
    findInsertPosition,
  };
};

export default useSortedTroves;
