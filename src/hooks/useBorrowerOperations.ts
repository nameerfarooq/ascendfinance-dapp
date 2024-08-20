import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { createWalletClient, custom, formatUnits, type Address, type TransactionReceipt } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useAccount } from "wagmi";

import BorrowerOperations_ABI from "@/abis/BorrowerOperations.json";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
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
} => {
  const { isConnected, address } = useAccount();
  const dispatch = useDispatch()
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
        dispatch(setLoader({ condition: "loading", text1: 'Depositing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

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
          if (tx) {

            dispatch(setLoader({ condition: "success", text1: 'Deposited', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))
          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Transaction Failed', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          }

          return tx;
        }
      } catch (error) {
        dispatch(setLoader({ condition: "failed", text1: 'Transaction Failed', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))
        console.log("openTrove(): ", error);
      }
    },
    [isConnected, address],
  );
  const closeTrove = useCallback(
    async (
      borrowerOperationsAddress: Address,
      troveManagerAddress: Address,
      walletAddress: Address,

    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(setLoader({ condition: "loading", text1: 'Repaying', text2: "GREEN" }))

        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress

        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
            abi: BorrowerOperations_ABI.abi,
            account: address,
            address: borrowerOperationsAddress,
            functionName: "closeTrove",
            args: [
              troveManagerAddress,
              walletAddress,
            ],
          });

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: 'Repayed', text2: "GREEN" }))
          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Repaying', text2: "" }))

          }
          return tx;
        }
      } catch (error) {
        dispatch(setLoader({ condition: "failed", text1: 'Repaying', text2: "" }))

        console.log("closeTrove(): ", error);
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
        dispatch(setLoader({ condition: "loading", text1: 'Depositing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

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
          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: 'Deposited', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Depositing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          }
          return tx;
        }
      } catch (error) {
        dispatch(setLoader({ condition: "failed", text1: 'Depositing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

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
        dispatch(setLoader({ condition: "loading", text1: 'Withdrawing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

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
          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: 'Withdrawed', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Withdrawing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          }
          return tx;
        }
      } catch (error) {
        console.log("withdrawColl(): ", error);
        dispatch(setLoader({ condition: "failed", text1: 'Withdrawing', text2: `${formatUnits(collateralAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

      }
    },
    [isConnected, address],
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
        dispatch(setLoader({ condition: "loading", text1: 'Repaying', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN` }))

        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
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
            functionName: "repayDebt",
            args: [troveManagerAddress, walletAddress, debtAmount, upperHint, lowerHint],
          });

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          console.log("tx: ", tx);
          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: 'Repayed', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN` }))

          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Repaying', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN` }))

          }
          return tx;
        }
      } catch (error) {
        console.log("repayDebt(): ", error);
        dispatch(setLoader({ condition: "failed", text1: 'Repaying', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} GREEN` }))

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
        dispatch(setLoader({ condition: "loading", text1: 'Minting', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

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
          if (tx?.status === "success") {
            dispatch(setLoader({ condition: "success", text1: 'Minted', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          } else {
            dispatch(setLoader({ condition: "failed", text1: 'Minting', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

          }
          return tx;
        }
      } catch (error) {
        console.log("withdrawDebt(): ", error);
        dispatch(setLoader({ condition: "failed", text1: 'Minting', text2: `${formatUnits(debtAmount, activeVault.token.decimals)} ${activeVault.token.symbol}` }))

      }
    },
    [isConnected, address],
  );

  return {
    openTrove,
    closeTrove,
    addColl,
    withdrawColl,
    withdrawDebt,
    repayDebt
  };
};

export default useBorrowerOperations;
