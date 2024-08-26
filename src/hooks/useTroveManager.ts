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
        console.log("convertYieldTokensToShares(): ", error);
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
        console.log("getTroveOwnersCount(): ", error);
        return 0n;
      }
    },
    [isConnected, address],
  );

  const getTroveStatus = useCallback(
    async (troveManagerAddress: Address, walletAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress && walletAddress) {
          const troveStatus = await readContract(publicClient, {
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
    [isConnected, address],
  );

  const getTroveCollSharesAndDebt = useCallback(
    async (troveManagerAddress: Address, walletAddress: Address): Promise<bigint[]> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress && walletAddress) {
          const troveCollSharesAndDebt = await readContract(publicClient, {
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "getTroveCollSharesAndDebt",
            args: [walletAddress],
          });

          return troveCollSharesAndDebt as bigint[];
        } else {
          return [0n, 0n];
        }
      } catch (error) {
        console.log("getTroveStatus(): ", error);
        return [0n, 0n];
      }
    },
    [isConnected, address],
  );

  const convertSharesToYieldTokens = useCallback(
    async (troveManagerAddress: Address, shares: bigint): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress && shares) {
          const { result } = await simulateContract(publicClient, {
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
    [isConnected, address],
  );

  const fetchPriceInUsd = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const { result } = await simulateContract(publicClient, {
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
    [isConnected, address],
  );

  const MCR = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const { result } = await simulateContract(publicClient, {
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
    [isConnected, address],
  );

  const getCurrentICR = useCallback(
    async (
      troveManagerAddress: Address,
      walletAddress: Address,
      usdPrice: bigint,
    ): Promise<bigint> => {
      try {
        if (isConnected && address && publicClient && troveManagerAddress) {
          const collateralRatio = await readContract(publicClient, {
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
    [isConnected, address],
  );

  const vmPaused = useCallback(
    async (troveManagerAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && publicClient) {
          const result = await readContract(publicClient, {
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
    [isConnected, address],
  );

  const sunsetting = useCallback(
    async (troveManagerAddress: Address): Promise<boolean | undefined> => {
      try {
        if (isConnected && address && publicClient) {
          const result = await readContract(publicClient, {
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
    [isConnected, address],
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
  };
};

export default useTroveManager;
