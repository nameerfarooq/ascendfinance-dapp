import { useCallback } from "react";

import { type Address } from "viem";
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
  ) => Promise<bigint>;
  getApproxHint: (
    multiCollateralHintHelpersAddress: Address,
    troveManagerAddress: Address,
    NICR: bigint,
    numTrial: string,
    inputRandomSeed: bigint,
  ) => Promise<[Address, bigint]>;
} => {
  const { isConnected, address } = useAccount();

  const computeNominalCR = useCallback(
    async (
      multiCollateralHintHelpersAddress: Address,
      collateralAmount: bigint,
      debtAmount: bigint,
    ): Promise<bigint> => {
      try {
        if (
          isConnected &&
          address &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          collateralAmount &&
          debtAmount
        ) {
          const NICR = await readContract(publicClient, {
            abi: MultiCollateralHintHelpers_ABI.abi,
            account: address,
            address: multiCollateralHintHelpersAddress,
            functionName: "computeNominalCR",
            args: [collateralAmount, debtAmount],
          });

          return NICR as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("computeNominalCR(): ", error);
        return 0n;
      }
    },
    [isConnected, address],
  );

  const getApproxHint = useCallback(
    async (
      multiCollateralHintHelpersAddress: Address,
      troveManagerAddress: Address,
      NICR: bigint,
      numTrial: string,
      inputRandomSeed: bigint,
    ): Promise<[Address, bigint]> => {
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
          const result = await readContract(publicClient, {
            abi: MultiCollateralHintHelpers_ABI.abi,
            account: address,
            address: multiCollateralHintHelpersAddress,
            functionName: "getApproxHint",
            args: [troveManagerAddress, NICR, numTrial, inputRandomSeed],
          });

          return result as [Address, bigint];
        } else {
          return ["0x", 0n];
        }
      } catch (error: any) {
        console.log("getApproxHint(): ", error);
        return ["0x", 0n];
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
