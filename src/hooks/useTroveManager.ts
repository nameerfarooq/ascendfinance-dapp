import { useCallback } from "react";

import { createWalletClient, custom, type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import TroveManager_ABI from "@/abis/TroveManager.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useTroveManager = (): {
  convertYieldTokensToShares: (
    troveManagerAddress: Address,
    amount: bigint,
  ) => Promise<bigint | void>;
  getTroveOwnersCount: (troveManagerAddress: Address) => Promise<bigint[] | void>;
} => {
  const { isConnected, address } = useAccount();

  const convertYieldTokensToShares = useCallback(
    async (troveManagerAddress: Address, amount: bigint): Promise<bigint | void> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress && amount) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const sharesAmount = await readContract(walletClient, {
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "convertYieldTokensToShares",
            args: [amount],
          });

          return sharesAmount as bigint;
        }
      } catch (error) {
        console.log("convertYieldTokensToShares (): ", error);
      }
    },
    [isConnected, address],
  );

  const getTroveOwnersCount = useCallback(
    async (troveManagerAddress: Address): Promise<bigint[] | void> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const troveOwnersCount = await readContract(walletClient, {
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTroveOwnersCount",
            args: [],
          });

          return troveOwnersCount as bigint[];
        }
      } catch (error) {
        console.log("getTroveOwnersCount (): ", error);
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
