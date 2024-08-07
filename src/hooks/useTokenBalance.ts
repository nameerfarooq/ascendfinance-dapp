import { useEffect, useState } from "react";

import { getBalance } from "@wagmi/core";
import type { Address } from "viem";
import { useAccount } from "wagmi";

import { wagmiConfig } from "@/wagmi";

interface UseTokenBalanceResult {
  fetchTokenBalance: string | bigint | null;
}

export const useTokenBalance = (tokenAddress: Address): UseTokenBalanceResult => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string | bigint | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchTokenBalance = async () => {
      try {
        const res = await getBalance(wagmiConfig, {
          address: address,
          token: tokenAddress,
        });
        setBalance(res.value);
      } catch (err) {
        console.log(err);
        setBalance(null);
      }
    };

    fetchTokenBalance();
  }, [address, tokenAddress]);

  return { fetchTokenBalance: balance };
};
