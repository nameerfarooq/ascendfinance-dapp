import { useCallback } from "react";

import { type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import AscendCore_ABI from "@/abis/AscendCore.json";

export const useAscendCore = (): {
  paused: (ascendCoreAddress: Address) => Promise<boolean | undefined>;
} => {
  const publicClient = usePublicClient();
  const { isConnected, chain, address } = useAccount();

  const paused = useCallback(
    async (ascendCoreAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient) {
          const result = await publicClient.readContract({
            abi: AscendCore_ABI.abi,
            account: address,
            address: ascendCoreAddress,
            functionName: "paused",
            args: [],
          });

          return result as boolean;
        }
      } catch (error) {
        console.log("paused(): ", error);
      }
    },
    [isConnected, address, chain, publicClient],
  );

  return {
    paused,
  };
};

export default useAscendCore;
