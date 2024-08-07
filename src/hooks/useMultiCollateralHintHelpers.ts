import { useCallback } from "react";

import { createWalletClient, custom, type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import MultiCollateralHintHelpers_ABI from "@/abis/MultiCollateralHintHelpers.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

export const useMultiCollateralHintHelpers = (): {
  computeNominalCR: (
    multiCollateralHintHelpersAddress: Address,
    collateralAmount: bigint,
    debtAmount: bigint,
  ) => Promise<bigint | void>;
  getApproxHint: (
    multiCollateralHintHelpersAddress: Address,
    troveManagerAddress: Address,
    NICR: bigint,
    numTrial: bigint,
    inputRandomSeed: bigint,
  ) => Promise<{
    hintAddress: Address;
    diff: bigint;
  } | void>;
} => {
  const { isConnected, address } = useAccount();

  const computeNominalCR = useCallback(
    async (
      multiCollateralHintHelpersAddress: Address,
      collateralAmount: bigint,
      debtAmount: bigint,
    ): Promise<bigint | void> => {
      try {
        if (
          isConnected &&
          address &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          collateralAmount &&
          debtAmount
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const NICR = await readContract(walletClient, {
            abi: MultiCollateralHintHelpers_ABI.abi,
            account: address,
            address: multiCollateralHintHelpersAddress,
            functionName: "computeNominalCR",
            args: [collateralAmount, debtAmount],
          });

          return NICR as bigint;
        }
      } catch (error) {
        console.log("computeNominalCR(): ", error);
      }
    },
    [isConnected, address],
  );

  const getApproxHint = useCallback(
    async (
      multiCollateralHintHelpersAddress: Address,
      troveManagerAddress: Address,
      NICR: bigint,
      numTrial: bigint,
      inputRandomSeed: bigint,
    ): Promise<{
      hintAddress: Address;
      diff: bigint;
    } | void> => {
      try {
        if (
          isConnected &&
          address &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          troveManagerAddress &&
          NICR &&
          numTrial &&
          inputRandomSeed
        ) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const result = await readContract(walletClient, {
            abi: MultiCollateralHintHelpers_ABI.abi,
            account: address,
            address: multiCollateralHintHelpersAddress,
            functionName: "getApproxHint",
            args: [troveManagerAddress, NICR, numTrial, inputRandomSeed],
          });

          return result as {
            hintAddress: Address;
            diff: bigint;
          };
        }
      } catch (error) {
        console.log("getApproxHint(): ", error);
      }
    },
    [isConnected, address],
  );

  return {
    computeNominalCR,
    getApproxHint,
  };
};

export default useMultiCollateralHintHelpers;
