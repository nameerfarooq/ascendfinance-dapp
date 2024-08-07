import { useMemo } from "react";

import type { Abi, Address } from "viem";
import { useAccount } from "wagmi";

import getContractInstance from "@/utils/getContractInstance";

export const useContract = (contractAddress: Address, contractABI: Abi) => {
  const { isConnected } = useAccount();

  return useMemo(() => {
    if (!isConnected || !contractAddress || !contractABI) {
      return null;
    } else return getContractInstance(contractAddress, contractABI);
  }, [isConnected, contractAddress, contractABI]);
};
