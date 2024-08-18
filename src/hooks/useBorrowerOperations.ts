import { useCallback } from "react";

import { createWalletClient, custom, type Address, type TransactionReceipt } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useAccount } from "wagmi";

import BorrowerOperations_ABI from "@/abis/BorrowerOperations.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

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

  withdrawDebt: (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    walletAddress: Address,
    maxFeePercentage: bigint,
    debtAmount: bigint,
    upperHint: Address,
    lowerHint: Address,
  ) => Promise<TransactionReceipt | void>;
} => {
  const { isConnected, address } = useAccount();

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
        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          // maxFeePercentage &&
          collateralAmount &&
          debtAmount &&
          upperHint &&
          lowerHint
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
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

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          return tx;
        }
      } catch (error) {
        console.log("openTrove(): ", error);
      }
    },
    [isConnected, address],
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
        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          collateralAmount &&
          upperHint &&
          lowerHint
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "addColl",
            args: [troveManagerAddress, walletAddress, collateralAmount, upperHint, lowerHint],
          });

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          return tx;
        }
      } catch (error) {
        console.log("addColl(): ", error);
      }
    },
    [isConnected, address],
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
        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          collateralAmount &&
          upperHint &&
          lowerHint
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "withdrawColl",
            args: [troveManagerAddress, walletAddress, collateralAmount, upperHint, lowerHint],
          });

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          return tx;
        }
      } catch (error) {
        console.log("withdrawColl(): ", error);
      }
    },
    [isConnected, address],
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
        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          // maxFeePercentage &&
          debtAmount &&
          upperHint &&
          lowerHint
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
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

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          return tx;
        }
      } catch (error: unknown) {
        console.log(error?.shortMessage);
        console.log("withdrawDebt(): ", error);
      }
    },
    [isConnected, address],
  );

  return {
    openTrove,
    addColl,
    withdrawColl,
    withdrawDebt,
  };
};

export default useBorrowerOperations;
