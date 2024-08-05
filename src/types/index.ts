interface Token {
  address: string;
  chainId?: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

interface VaultType {
  name: string;
  token: Token;
}

interface VaultsListType {
  [x: string]: VaultType;
}

export type { Token, VaultType, VaultsListType };
