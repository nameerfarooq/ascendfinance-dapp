/* eslint-disable @typescript-eslint/no-unused-vars */

interface Token {
  address: string;
  chainId?: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

type VaultsListType = {
  [x: string]: { token: Token };
};

export { type Token, type VaultsListType };
