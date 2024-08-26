import { useCallback } from "react";

import { type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import AscendCore_ABI from "@/abis/AscendCore.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useAscendCore = (): {
  paused: (ascendCoreAddress: Address) => Promise<boolean | undefined>;
} => {
  const { isConnected, address } = useAccount();

  const paused = useCallback(
    async (ascendCoreAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && publicClient) {
          const result = await readContract(publicClient, {
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
    [isConnected, address],
  );

  return {
    paused,
  };
};

export default useAscendCore;
