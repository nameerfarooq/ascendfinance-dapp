/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from "react";

import { useDispatch } from "react-redux";
import {
  createWalletClient,
  custom,
  formatUnits,
  type Address,
  type TransactionReceipt,
} from "viem";
import { readContract, waitForTransactionReceipt, writeContract } from "viem/actions";
import { useAccount } from "wagmi";

import ERC20_ABI from "@/abis/ERC20.json";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

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
  const { isConnected, address } = useAccount();
  const dispatch = useDispatch();
  const activeVault = useAppSelector((state) => state.vault.activeVault);

  const balanceOf = useCallback(
    async (tokenAddress: Address, walletAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && tokenAddress && walletAddress) {
          const balance = await readContract(publicClient, {
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
    [isConnected],
  );

  const allowance = useCallback(
    async (
      tokenAddress: Address,
      ownerAddress: Address,
      spenderAddress: Address,
    ): Promise<bigint> => {
      try {
        if (isConnected && tokenAddress && ownerAddress && spenderAddress) {
          const balance = await readContract(publicClient, {
            abi: ERC20_ABI,
            address: tokenAddress,
            functionName: "allowance",
            args: [ownerAddress, spenderAddress],
          });

          return balance as bigint;
        } else {
          return 0n;
        }
      } catch (error) {
        console.log("allowance(): ", error);
        return 0n;
      }
    },
    [isConnected],
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
        if (isConnected && address && tokenAddress && spenderAddress && amount && publicClient) {
          const walletClient = createWalletClient({
            chain: publicClient.chain,
            transport: custom(window.ethereum!),
          });

          const hash = await writeContract(walletClient, {
            abi: ERC20_ABI,
            account: address,
            address: tokenAddress,
            functionName: "approve",
            args: [spenderAddress, amount],
          });

          console.log("hash: ", hash);

          const tx = await waitForTransactionReceipt(publicClient, { hash });
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
        // const keys = Object.keys(error);

        // for (const key of keys) {
        //   console.log(key, ": ", error[key]);
        // }
      }
    },
    [isConnected, address],
  );

  return {
    balanceOf,
    allowance,
    approve,
  };
};

export default useERC20Contract;
