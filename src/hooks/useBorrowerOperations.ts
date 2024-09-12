/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from "react";

import { useDispatch } from "react-redux";
import {
  formatUnits,
  type Address,
  type TransactionReceipt,
} from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import BorrowerOperations_ABI from "@/abis/BorrowerOperations.json";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";

export const useBorrowerOperations = (): {
  openTrove: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    maxFeePercentage: bigint,
    collateralAmount: bigint,
    debtAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;
  closeTrove: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
  ) => Promise<TransactionReceipt | void>;
  addColl: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    collateralAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;
  withdrawColl: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    collateralAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;
  repayDebt: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    debtAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;

  withdrawDebt: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    maxFeePercentage: bigint,
    debtAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;
  minNetDebt: (borrowerOperationsAddress: Address) => Promise<bigint>;
  CCR: (borrowerOperationsAddress: Address) => Promise<bigint>;
  getTCR: (borrowerOperationsAddress: Address) => Promise<bigint>;
  getGlobalSystemBalances: (borrowerOperationsAddress: Address) => Promise<bigint[]>;
} => {
  const dispatch = useDispatch();
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();
  const { isConnected, chain, address } = useAccount();
  const activeVault = useAppSelector((state) => state.vault.activeVault);

  const openTrove = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
      maxFeePercentage: bigint,
      collateralAmount: bigint,
      debtAmount: bigint,
      upperHint: Address,
      lowerHint: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Depositing",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          walletClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          // maxFeePercentage &&
          collateralAmount &&
          debtAmount &&
          upperHint &&
          lowerHint
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "openTrove",
            args: [
              troveManagerAddress,
              walletAddress,
              maxFeePercentage,
              collateralAmount,
              debtAmount,
              upperHint,
              lowerHint,
            ],
          });

          const tx = await publicClient?.waitForTransactionReceipt({ hash: txHash ? txHash : "0x" });
          console.log("tx: ", tx);

          if (tx) {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Deposited",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Transaction Failed",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }

          return tx;
        }
      } catch (error) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Transaction Failed",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
        console.log("openTrove(): ", error);
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const closeTrove = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(setLoader({ condition: "loading", text1: "Repaying", text2: "GREEN" }));

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "closeTrove",
            args: [troveManagerAddress, walletAddress],
          });

          const tx = await publicClient?.waitForTransactionReceipt({ hash: txHash ? txHash : "0x" });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: "Repayed", text2: "GREEN" }));
          } else {
            dispatch(setLoader({ condition: "failed", text1: "Repaying", text2: "" }));
          }
          return tx;
        }
      } catch (error) {
        dispatch(setLoader({ condition: "failed", text1: "Repaying", text2: "" }));

        console.log("closeTrove(): ", error);
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const addColl = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
      collateralAmount: bigint,
      upperHint: Address,
      lowerHint: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Depositing",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          collateralAmount &&
          upperHint &&
          lowerHint
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "addColl",
            args: [troveManagerAddress, walletAddress, collateralAmount, upperHint, lowerHint],
          });

          const tx = await publicClient?.waitForTransactionReceipt({ hash: txHash ? txHash : "0x" });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Deposited",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Depositing",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }
          return tx;
        }
      } catch (error) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Depositing",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        console.log("addColl(): ", error);
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const withdrawColl = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
      collateralAmount: bigint,
      upperHint: Address,
      lowerHint: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Withdrawing",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          collateralAmount &&
          upperHint &&
          lowerHint
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "withdrawColl",
            args: [troveManagerAddress, walletAddress, collateralAmount, upperHint, lowerHint],
          });

          const tx = await publicClient?.waitForTransactionReceipt({
            hash: txHash ? txHash : "0x",
          });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Withdrawed",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Withdrawing",
                text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }
          return tx;
        }
      } catch (error) {
        console.log("withdrawColl(): ", error);
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Withdrawing",
            text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const repayDebt = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
      debtAmount: bigint,
      upperHint: Address,
      lowerHint: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Repaying",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          debtAmount &&
          upperHint &&
          lowerHint
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "repayDebt",
            args: [troveManagerAddress, walletAddress, debtAmount, upperHint, lowerHint],
          });

          const tx = await publicClient?.waitForTransactionReceipt({
            hash: txHash ? txHash : "0x",
          });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Repayed",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Repaying",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN`,
              }),
            );
          }
          return tx;
        }
      } catch (error) {
        console.log("repayDebt(): ", error);
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Repaying",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN`,
          }),
        );
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const withdrawDebt = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,
      maxFeePercentage: bigint,
      debtAmount: bigint,
      upperHint: Address,
      lowerHint: Address,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Minting",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );

        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          // maxFeePercentage &&
          debtAmount &&
          upperHint &&
          lowerHint
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "withdrawDebt",
            args: [
              troveManagerAddress,
              walletAddress,
              maxFeePercentage,
              debtAmount,
              upperHint,
              lowerHint,
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
                text1: "Minted",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Minting",
                text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }
          return tx;
        }
      } catch (error) {
        console.log("withdrawDebt(): ", error);
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Minting",
            text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
    },
    [isConnected, address, publicClient, walletClient],
  );

  const minNetDebt = useCallback(
    async (borrowerOperationsAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress
        ) {
          const result = await publicClient?.readContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "minNetDebt",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("minNetDebt(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, publicClient],
  );

  const CCR = useCallback(
    async (borrowerOperationsAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress
        ) {
          const result = await publicClient?.readContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "CCR",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("CCR(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, publicClient],
  );

  const getTCR = useCallback(
    async (borrowerOperationsAddress: Address): Promise<bigint> => {
      const defaultValue = 0n;

      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress
        ) {
          const { result } = await publicClient?.simulateContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "getTCR",
            args: [],
          });

          return result as bigint;
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("getTCR(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, publicClient],
  );

  const getGlobalSystemBalances = useCallback(
    async (borrowerOperationsAddress: Address): Promise<bigint[]> => {
      const defaultValue = [0n, 0n];

      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          borrowerOperationsAddress
        ) {
          const { result } = await publicClient?.simulateContract({
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "getGlobalSystemBalances",
            args: [],
          });

          return result as bigint[];
        } else {
          return defaultValue;
        }
      } catch (error) {
        console.log("getGlobalSystemBalances(): ", error);
        return defaultValue;
      }
    },
    [isConnected, address, publicClient],
  );

  return {
    openTrove,
    closeTrove,
    addColl,
    withdrawColl,
    withdrawDebt,
    repayDebt,
    minNetDebt,
    CCR,
    getTCR,
    getGlobalSystemBalances,
  };
};

export default useBorrowerOperations;
