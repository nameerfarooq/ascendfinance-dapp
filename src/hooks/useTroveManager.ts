import { useCallback } from "react";

import { type Address } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { useAccount } from "wagmi";

import TroveManager_ABI from "@/abis/TroveManager.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useTroveManager = (): {
  convertYieldTokensToShares: (troveManagerAddress: Address, amount: bigint) => Promise<bigint>;
  getTroveOwnersCount: (troveManagerAddress: Address) => Promise<bigint>;
} => {
  const { isConnected, address } = useAccount();

  const convertYieldTokensToShares = useCallback(
    async (troveManagerAddress: Address, amount: bigint): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress && amount) {
          const { result } = await simulateContract(publicClient, {
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "convertYieldTokensToShares",
            args: [amount],
          });

          return result as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("convertYieldTokensToShares (): ", error);
        return 0n;
      }
    },
    [isConnected, address],
  );

  const getTroveOwnersCount = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const troveOwnersCount = await readContract(publicClient, {
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTroveOwnersCount",
            args: [],
          });

          return troveOwnersCount as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("getTroveOwnersCount (): ", error);
        return 0n;
      }
    },
    [isConnected, address],
  );

  return {
    convertYieldTokensToShares,
    getTroveOwnersCount,
  };
};

export default useTroveManager;
