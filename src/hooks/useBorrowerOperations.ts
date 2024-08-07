import { useCallback } from "react";

import { createWalletClient, custom, type Address } from "viem";
import { writeContract } from "viem/actions";
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
  ) => Promise<string | void>;
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
    ): Promise<string | void> => {
      try {
        if (
          isConnected &&
          address &&
          publicClient &&
          borrowerOperationsAddress &&
          troveManagerAddress &&
          walletAddress &&
          maxFeePercentage &&
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

          return hash;
        }
      } catch (error) {
        console.log("openTrove(): ", error);
      }
    },
    [isConnected, address],
  );

  return {
    openTrove,
  };
};

export default useBorrowerOperations;
