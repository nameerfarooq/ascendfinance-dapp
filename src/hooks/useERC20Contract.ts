import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { formatUnits, type Address, type TransactionReceipt } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import ERC20_ABI from "@/abis/ERC20.json";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";

export const useERC20Contract = (): {
  balanceOf: (tokenAddress: Address, walletAddress: Address) => Promise<bigint>;
  allowance: (
    tokenAddress: Address,
    ownerAddress: Address,
    spenderAddress: Address,
  ) => Promise<bigint>;
  approve: (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
  ) => Promise<TransactionReceipt | void>;
} => {
  const activeVault = useAppSelector((state) => state.vault.activeVault);
  const dispatch = useDispatch();
  const publicClient = usePublicClient();
  const walletClient = useWalletClient();
  const { isConnected, chain, address } = useAccount();

  const balanceOf = useCallback(
    async (tokenAddress: Address, walletAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && address && chain && chain.id && tokenAddress && walletAddress) {
          const balance = await publicClient?.readContract({
            abi: ERC20_ABI,
            address: tokenAddress,
            functionName: "balanceOf",
            args: [walletAddress],
          });

          return balance as bigint;
        } else return 0n;
      } catch (error) {
        console.log("balanceOf(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const allowance = useCallback(
    async (
      tokenAddress: Address,
      ownerAddress: Address,
      spenderAddress: Address,
    ): Promise<bigint> => {
      try {
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          tokenAddress &&
          ownerAddress &&
          spenderAddress
        ) {
          const allowance = await publicClient?.readContract({
            abi: ERC20_ABI,
            address: tokenAddress,
            functionName: "allowance",
            args: [ownerAddress, spenderAddress],
          });

          console.log("Result: ", allowance);

          return allowance as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("allowance(): ", error);
        return 0n;
      }
    },
    [isConnected, address, chain, publicClient],
  );

  const approve = useCallback(
    async (
      tokenAddress: Address,
      spenderAddress: Address,
      amount: bigint,
    ): Promise<TransactionReceipt | void> => {
      try {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Approval pending",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
        if (
          isConnected &&
          address &&
          chain &&
          chain.id &&
          tokenAddress &&
          spenderAddress &&
          amount &&
          publicClient
        ) {
          const txHash = await walletClient?.data?.writeContract({
            abi: ERC20_ABI,
            account: address,
            address: tokenAddress,
            functionName: "approve",
            args: [spenderAddress, amount],
          });

          console.log("hash: ", txHash);

          const tx = await publicClient?.waitForTransactionReceipt({
            hash: txHash ? txHash : "0x",
          });
          console.log("tx: ", tx);

          if (tx?.status === "success") {
            dispatch(
              setLoader({
                condition: "success",
                text1: "Approval granted",
                text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          } else {
            dispatch(
              setLoader({
                condition: "failed",
                text1: "Approval rejected",
                text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              }),
            );
          }
          return tx;
        }
      } catch (error) {
        console.log("approve(): ", error);
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Approval rejected",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
    },
    [isConnected, address, chain, activeVault, publicClient, walletClient, dispatch],
  );

  return {
    balanceOf,
    allowance,
    approve,
  };
};

export default useERC20Contract;
