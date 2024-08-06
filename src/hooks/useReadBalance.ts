import { createWalletClient, getContract, custom, type Address } from "viem";

import ERC20_ABI from "@/abis/ERC20.json";
import { wagmiConfig } from "@/wagmi";

const useERC20Contract = (tokenAddress: Address | undefined) => {
  if (tokenAddress) {
    const publicClient = wagmiConfig.getClient();

    const walletClient = createWalletClient({
      chain: wagmiConfig.chains,
      transport: custom(window.ethereum!),
    });

    //   1. Create contract instance
    const contractInstance = getContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      //   client: publicClient,
      client: { public: publicClient, wallet: walletClient },
    });

    return contractInstance;
  }
};

export default useERC20Contract;
