import { useCallback } from "react";

import { type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import TroveManager_ABI from "@/abis/TroveManager.json";

export const useTroveManager = (): {
  convertYieldTokensToShares: (troveManagerAddress: Address, amount: bigint) => Promise<bigint>;
  getTroveOwnersCount: (troveManagerAddress: Address) => Promise<bigint>;
  getTroveStatus: (troveManagerAddress: Address, walletAddress: Address) => Promise<bigint>;
  getTroveCollSharesAndDebt: (
    troveManagerAddress: Address,
    walletAddress: Address,
  ) => Promise<bigint[]>;
  convertSharesToYieldTokens: (troveManagerAddress: Address, shares: bigint) => Promise<bigint>;
  fetchPriceInUsd: (troveManagerAddress: Address) => Promise<bigint>;
  MCR: (troveManagerAddress: Address) => Promise<bigint>;
  getCurrentICR: (
    troveManagerAddress: Address,
    walletAddress: Address,
    usdPrice: bigint,
  ) => Promise<bigint>;
  vmPaused: (troveManagerAddress: Address) => Promise<boolean | undefined>;
  sunsetting: (troveManagerAddress: Address) => Promise<boolean | undefined>;
  maxSystemDebt: (borrowerOperationsAddress: Address) => Promise<bigint>;
  defaultedDebt: (borrowerOperationsAddress: Address) => Promise<bigint>;
  getTotalActiveDebt: (borrowerOperationsAddress: Address) => Promise<bigint>;
} => {
  const publicClient = usePublicClient();
  const { isConnected, address, chain } = useAccount();

  const convertYieldTokensToShares = useCallback(
    async (troveManagerAddress: Address, amount: bigint): Promise<bigint> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          troveManagerAddress &&
          amount
        ) {
          const { result } = await publicClient?.simulateContract({
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
        console.log("convertYieldTokensToShares(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const getTroveOwnersCount = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const troveOwnersCount = await publicClient?.readContract({
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
        console.log("getTroveOwnersCount(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const getTroveStatus = useCallback(
    async (troveManagerAddress: Address, walletAddress: Address): Promise<bigint> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          troveManagerAddress &&
          walletAddress
        ) {
          const troveStatus = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTroveStatus",
            args: [walletAddress],
          });

          return troveStatus as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("getTroveStatus(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const getTroveCollSharesAndDebt = useCallback(
    async (troveManagerAddress: Address, walletAddress: Address): Promise<bigint[]> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          troveManagerAddress &&
          walletAddress
        ) {
          const troveCollSharesAndDebt = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTroveCollSharesAndDebt",
            args: [walletAddress],
          });

          return troveCollSharesAndDebt as bigint[]; // ["collShares", "debt"]
        } else {
          return [0n, 0n];
        }
      } catch (error) {
        console.log("getTroveStatus(): ", error);
        return [0n, 0n];
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const convertSharesToYieldTokens = useCallback(
    async (troveManagerAddress: Address, shares: bigint): Promise<bigint> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          troveManagerAddress &&
          shares
        ) {
          const { result } = await publicClient?.simulateContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "convertSharesToYieldTokens",
            args: [shares],
          });

          return result as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("convertSharesToYieldTokens(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const fetchPriceInUsd = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const { result } = await publicClient?.simulateContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "fetchPriceInUsd",
            args: [],
          });

          return result as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("fetchPriceInUsd(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const MCR = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const { result } = await publicClient?.simulateContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "MCR",
            args: [],
          });

          return result as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("MCR(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const getCurrentICR = useCallback(
    async (
      troveManagerAddress: Address,
      walletAddress: Address,
      usdPrice: bigint,
    ): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const collateralRatio = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getCurrentICR",
            args: [walletAddress, usdPrice],
          });

          return collateralRatio as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("getCurrentICR(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const vmPaused = useCallback(
    async (troveManagerAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient) {
          const result = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "paused",
            args: [],
          });

          return result as boolean;
        }
      } catch (error) {
        console.log("vmPaused(): ", error);
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const sunsetting = useCallback(
    async (troveManagerAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient) {
          const result = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "sunsetting",
            args: [],
          });

          return result as boolean;
        }
      } catch (error) {
        console.log("sunsetting(): ", error);
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const maxSystemDebt = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const result = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "maxSystemDebt",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("maxSystemDebt(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const defaultedDebt = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const result = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "defaultedDebt",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("defaultedDebt(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const getTotalActiveDebt = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const result = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTotalActiveDebt",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("getTotalActiveDebt(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  return {
    convertYieldTokensToShares,
    getTroveOwnersCount,
    getTroveStatus,
    getTroveCollSharesAndDebt,
    convertSharesToYieldTokens,
    fetchPriceInUsd,
    MCR,
    getCurrentICR,
    vmPaused,
    sunsetting,
    maxSystemDebt,
    defaultedDebt,
    getTotalActiveDebt,
  };
};

export default useTroveManager;
