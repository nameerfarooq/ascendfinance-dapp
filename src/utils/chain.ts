import type { Chain } from "viem";

export const getDefaultChainId = (chain: Chain | undefined): number => {
  let defaultChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? 1 : 11155111;
  if (chain && chain.id) defaultChainId = chain.id;
  return defaultChainId;
};
