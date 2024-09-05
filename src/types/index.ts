import type { Address } from "viem";

interface Token {
  address: Address;
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
  DEV: {
    [x: number]: {
      [x: string]: VaultType;
    };
  };
  PROD: {
    [x: number]: {
      [x: string]: VaultType;
    };
  };
}

interface ContractAddressObjectType {
  DEV: {
    [x: number]: {
      BORROWER_OPERATIONS: Address;
      DEBT_TOKEN: Address;
      FACTORY: Address;
      LIQUIDATION_MANAGER: Address;
      PRICE_FEED: Address;
      ASCEND_CORE: Address;
      STABILITY_POOL: Address;
      MULTI_COLLATERAL_HINT_HELPERS: Address;
      MULTI_TROVE_GETTER: Address;
      troves: {
        [x: Address]: {
          TROVE_MANAGER: Address;
          SORTED_TROVES: Address;
        };
      };
    };
  };
  PROD: {
    [x: number]: {
      BORROWER_OPERATIONS: Address;
      DEBT_TOKEN: Address;
      FACTORY: Address;
      LIQUIDATION_MANAGER: Address;
      PRICE_FEED: Address;
      ASCEND_CORE: Address;
      STABILITY_POOL: Address;
      MULTI_COLLATERAL_HINT_HELPERS: Address;
      MULTI_TROVE_GETTER: Address;
      troves: {
        [x: Address]: {
          TROVE_MANAGER: Address;
          SORTED_TROVES: Address;
        };
      };
    };
  };
}

interface CombinedTroveDataType {
  owner: Address;
  debt: bigint;
  coll: bigint;
  stake: bigint;
  snapshotCollateral: bigint;
  snapshotDebt: bigint;
}

interface PositionStatsType {
  id: Address;
  collateral: string;
  debt: string;
  collateralRatio: string;
  liquidationPrice: string;
  positionIndex: number;
}

export type {
  Token,
  VaultType,
  VaultsListType,
  ContractAddressObjectType,
  CombinedTroveDataType,
  PositionStatsType,
};
