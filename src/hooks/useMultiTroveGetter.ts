import { useCallback } from "react";

import { type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import MultiTroveGetter_ABI from "@/abis/MultiTroveGetter.json";
import type { CombinedTroveDataType } from "@/types";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useMultiTroveGetter = (): {
  getMultipleSortedTroves: (
    multiTroveGetterAddress: Address,
    troveManagerAddress: Address,
    startIdx: number,
    count: bigint,
  ) => Promise<CombinedTroveDataType[]>;
} => {
  const { isConnected, address } = useAccount();
  const getMultipleSortedTroves = useCallback(
    async (
      multiTroveGetterAddress: Address,
      troveManagerAddress: Address,
      startIdx: number,
      count: bigint,
    ): Promise<CombinedTroveDataType[]> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const troves = await readContract(publicClient, {
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
    [isConnected, address],
  );

  return {
    getMultipleSortedTroves,
  };
};

export default useMultiTroveGetter;
