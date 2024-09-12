import { useCallback } from "react";

import { type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import MultiTroveGetter_ABI from "@/abis/MultiTroveGetter.json";
import type { CombinedTroveDataType } from "@/types";

export const useMultiTroveGetter = (): {
  getMultipleSortedTroves: (
    multiTroveGetterAddress: Address,
    troveManagerAddress: Address,
    startIdx: number,
    count: bigint,
  ) => Promise<CombinedTroveDataType[]>;
} => {
  const publicClient = usePublicClient();
  const { isConnected, address, chain } = useAccount();

  const getMultipleSortedTroves = useCallback(
    async (
      multiTroveGetterAddress: Address,
      troveManagerAddress: Address,
      startIdx: number,
      count: bigint,
    ): Promise<CombinedTroveDataType[]> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const troves = await publicClient?.readContract({
            abi: MultiTroveGetter_ABI.abi,
            account: address,
            address: multiTroveGetterAddress,
            functionName: "getMultipleSortedTroves",
            args: [troveManagerAddress, startIdx, count],
          });

          return troves as [];
        } else {
          return [];
        }
      } catch (error) {
        console.log("getMultipleSortedTroves(): ", error);
        return [];
      }
    },
    [isConnected, address, chain, publicClient],
  );

  return {
    getMultipleSortedTroves,
  };
};

export default useMultiTroveGetter;
