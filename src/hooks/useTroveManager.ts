import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { formatUnits, type Address, type TransactionReceipt } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import TroveManager_ABI from "@/abis/TroveManager.json";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import type { VaultType } from "@/types";

export const useTroveManager = (): {
  convertYieldTokensToShares: (troveManagerAddress: Address, amount: bigint) => Promise<bigint>;
  getTroveOwnersCount: (troveManagerAddress: Address) => Promise<bigint>;
  BOOTSTRAP_PERIOD: (troveManagerAddress: Address) => Promise<bigint>;
  systemDeploymentTime: (troveManagerAddress: Address) => Promise<bigint>;
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
  redeemCollateral: (
    troveManagerAddress: Address,
    activeVault: VaultType,
    debtAmount: bigint,
    firstRedemptionHint: Address,
    upperPartialRedemptionHint: Address,
    lowerPartialRedemptionHint: Address,
    partialRedemptionHintNICR: bigint,
    maxIterations: bigint,
    maxFeePercentage: bigint
  ) => Promise<TransactionReceipt | void>
} => {
  const publicClient = usePublicClient();
  const { isConnected, address, chain } = useAccount();
  const dispatch = useDispatch()
  const walletClient = useWalletClient();


  const redeemCollateral = useCallback(
    async (
      troveManagerAddress: Address,
      activeVault: VaultType,
      debtAmount: bigint,
      firstRedemptionHint: Address,
      upperPartialRedemptionHint: Address,
      lowerPartialRedemptionHint: Address,
      partialRedemptionHintNICR: bigint,
      maxIterations: bigint,
      maxFeePercentage: bigint

    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Redeem",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          walletClient &&
          publicClient &&
          troveManagerAddress &&
          activeVault &&
          debtAmount &&
          firstRedemptionHint &&
          upperPartialRedemptionHint &&
          lowerPartialRedemptionHint &&
          partialRedemptionHintNICR &&
          maxFeePercentage
        ) {

          const txHash = await walletClient?.data?.writeContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "redeemCollateral",
            args: [
              debtAmount,
              firstRedemptionHint,
              upperPartialRedemptionHint,
              lowerPartialRedemptionHint,
              partialRedemptionHintNICR,
              maxIterations,
              maxFeePercentage,
            ],
          });

          const tx = await publicClient?.waitForTransactionReceipt({
            hash: txHash ? txHash : "0x",
          });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Redeemed",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Redeem",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }
          return tx;
        }
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Redeem",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      } catch (error) {
        console.log("redeemCollateral(): ", error);
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Redeem",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

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

  const BOOTSTRAP_PERIOD = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const BOOTSTRAP_PERIOD = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "BOOTSTRAP_PERIOD",
            args: [],
          });

          return BOOTSTRAP_PERIOD as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("BOOTSTRAP_PERIOD(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );
  const systemDeploymentTime = useCallback(
    async (troveManagerAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && publicClient && troveManagerAddress) {
          const systemDeploymentTime = await publicClient?.readContract({
            abi: TroveManager_ABI.abi,
            account: address,
            address: troveManagerAddress,
            functionName: "systemDeploymentTime",
            args: [],
          });

          return systemDeploymentTime as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("systemDeploymentTime(): ", error);
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
    systemDeploymentTime,
    BOOTSTRAP_PERIOD,
    redeemCollateral,
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
