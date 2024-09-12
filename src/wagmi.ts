"use client";

import { connectorsForWallets, type Chain } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport } from "viem";
import { createConfig, http, cookieStorage, createStorage, fallback } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT || "DEV";
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!appBuildEnvironment) {
  throw new Error(
    "NEXT_PUBLIC_ENVIRONMENT is not defined. Please check your environment variables.",
  );
}

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "Ascend Finance", projectId: walletConnectProjectId },
);

const transportChain: Chain = appBuildEnvironment === "PROD" ? mainnet : sepolia;
const rpcUrl = transportChain.rpcUrls.default.http[0];
const transports: Record<number, Transport> = {
  [transportChain.id]: fallback([
    http(
      transportChain.id === 11155111
        ? `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        : `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
    ),
    http(rpcUrl),
    http(),
  ]),
};

// export const config = getDefaultConfig({
//   appName: "ascendfinance-frontend",
//   projectId: walletConnectProjectId,
//   chains: [transportChain],
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports,
// });

export const wagmiConfig = createConfig({
  chains: [transportChain],
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports,
  pollingInterval: 6000,
});

// export function getConfig() {
//   return createConfig({
//     chains: [transportChain],
//     connectors,
//     ssr: true,
//     storage: createStorage({
//       storage: cookieStorage,
//     }),
//     transports,
//   });
// }
