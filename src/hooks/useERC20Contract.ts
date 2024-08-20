import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { createWalletClient, custom, formatUnits, type Address, type TransactionReceipt } from "viem";
import { readContract, waitForTransactionReceipt, writeContract } from "viem/actions";
import { useAccount } from "wagmi";

// eslint-disable-next-line import/order
import ERC20_ABI from "@/abis/ERC20.json";
// import getContractInstance from "@/utils/getContractInstance";

import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();

// const useERC20Contract = (tokenAddress: Address | undefined) => {
//   // const client = useClient();
//   if (tokenAddress) {
//     const publicClient = wagmiConfig.getClient();

//     const walletClient = createWalletClient({
//       // chain: publicClient.chain,
//       chain: wagmiConfig.chains[0],
//       transport: custom(window.ethereum!),
//     });

//     //   1. Create contract instance
//     const contractInstance = getContract({
//       address: tokenAddress,
//       abi: ERC20_ABI,
//       //   client: publicClient,
//       client: { public: publicClient, wallet: walletClient },
//     });

//     return contractInstance;
//   }
// };

// export const getAllowance = async () => {
//   try {
//     return await readContract(publicClient, {
//       address: "0xF0F058e935a2a43F72840F8146FE505D8E0d782D",
//       abi: ERC20_ABI,
//       functionName: "balanceOf",
//       args: ["0xf0bc96D1A267Ab9d6A952Cbb627AAE4bf0013763"],
//     });
//   } catch (error) {
//     console.log("getAllowance(): ", error);
//   }
// };

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
  const dispatch = useDispatch()
  const activeVault = useAppSelector((state) => state.vault.activeVault);

  const balanceOf = useCallback(
    async (tokenAddress: Address, walletAddress: Address): Promise<bigint> => {
      try {
        if (isConnected && tokenAddress && walletAddress) {
          // const erc20ContractInstance = getContractInstance(tokenAddress, ERC20_ABI as Abi);
          // const balance = await erc20ContractInstance?.read?.balanceOf([walletAddress]);

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
            condition: 'loading',
            text1: 'Approval pending',
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          })
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

          const tx = await waitForTransactionReceipt(publicClient, { hash });
          if (tx?.status === "success") {

            dispatch(
              setLoader({
                condition: 'success',
                text1: 'Approval granted',
                text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              })
            );
          } else {
            dispatch(
              setLoader({
                condition: 'failed',
                text1: 'Approval rejected',
                text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
              })
            );
          }
          return tx;
        }
      } catch (error: any) {
        console.log("approve(): ", error);
        dispatch(
          setLoader({
            condition: 'failed',
            text1: 'Approval rejected',
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          })
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
