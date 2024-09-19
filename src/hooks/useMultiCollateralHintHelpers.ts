import { useCallback } from "react";

import { type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import MultiCollateralHintHelpers_ABI from "@/abis/MultiCollateralHintHelpers.json";

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
  getRedemptionHints: (
    multiCollateralHintHelpersAddress: Address,
    troveManagerAddress: Address,
    debtAmount: bigint,
    price: bigint,
    maxIterations: bigint,
  ) => Promise<[Address, bigint, bigint]>;
} => {
  const publicClient = usePublicClient();
  const { isConnected, address, chain } = useAccount();

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
          chain &&
          chain.id &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          collateralAmount &&
          debtAmount
        ) {
          const NICR = await publicClient?.readContract({
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
    [isConnected, address, chain, publicClient],
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
          chain &&
          chain.id &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          troveManagerAddress &&
          NICR &&
          numTrial &&
          inputRandomSeed
        ) {
          const result = await publicClient?.readContract({
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
      } catch (error) {
        console.log("getApproxHint(): ", error);
        return ["0x", 0n];
      }
    },
    [isConnected, address, chain, publicClient],
  );
  const getRedemptionHints = useCallback(
    async (
      multiCollateralHintHelpersAddress: Address,
      troveManagerAddress: Address,
      debtAmount: bigint,
      price: bigint,
      maxIterations: bigint,
    ): Promise<[Address, bigint, bigint]> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          publicClient &&
          multiCollateralHintHelpersAddress &&
          troveManagerAddress &&
          debtAmount &&
          price
        ) {
          console.log("GET REDEMPTION HINTS ARGUMENTS")
          console.log("debtAmount :", debtAmount)
          console.log("price :", price)
          console.log("maxIterations :", maxIterations)

          const {result} = await publicClient?.simulateContract({
            abi: MultiCollateralHintHelpers_ABI.abi,
            account: address,
            address: multiCollateralHintHelpersAddress,
            functionName: "getRedemptionHints",
            args: [troveManagerAddress, debtAmount, price, maxIterations],
          });

          return result as [Address, bigint, bigint];
        } else {
          return ["0x", 0n, 0n];
        }
      } catch (error) {
        console.log("getRedemptionHints(): ", error);
        return ["0x", 0n, 0n];
      }
    },
    [isConnected, address, chain, publicClient],
  );


  return {
    computeNominalCR,
    getApproxHint,
    getRedemptionHints
  };
};

export default useMultiCollateralHintHelpers;
