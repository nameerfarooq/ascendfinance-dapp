import {
  createWalletClient,
  custom,
  getContract,
  isAddress,
  zeroAddress,
  type Abi,
  type Address,
} from "viem";

import { wagmiConfig } from "@/wagmi";

const getContractInstance = (contractAddress: Address, contractABI: Abi) => {
  const publicClient = wagmiConfig.getClient();

  if (!isAddress(contractAddress) || contractAddress === zeroAddress) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  if (publicClient && contractAddress && contractABI) {
    const walletClient = createWalletClient({
      chain: publicClient.chain,
      transport: custom(window.ethereum!),
    });

    const contractInstance = getContract({
      address: contractAddress,
      abi: contractABI,
      client: { public: publicClient, wallet: walletClient },
    });

    return contractInstance;
  }
};

export default getContractInstance;
