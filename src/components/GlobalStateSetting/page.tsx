"use client";

import { useEffect } from "react";
import type { FC, ReactNode } from "react";

import type { Address } from "viem";
import { useAccount, useWatchBlockNumber } from "wagmi";

import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import useAscendCore from "@/hooks/useAscendCore";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useTroveManager from "@/hooks/useTroveManager";
import {
  setLatestBlockNumber,
  setIsRecoveryMode,
  setIsPaused,
  setIsSunSetting,
  setIsVmPaused,
  setMaxSystemDebt,
  setDefaultedDebt,
  setTotalActiveDebt,
  setMCR,
  setMinNetDebt,
  setCCR,
  setTCR,
  setGlobalSystemBalances,
} from "@/lib/features/protocol/protocolSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getDefaultChainId } from "@/utils/chain";

interface GlobalStateSettingProps {
  children: ReactNode;
}

const GlobalStateSetting: FC<GlobalStateSettingProps> = ({ children }) => {
  const activeVault = useAppSelector((state) => state.vault.activeVault);
  const latestBlockNumber = useAppSelector((state) => state.protocol.latestBlockNumber);
  const { CCR_value, TCR_value } = useAppSelector((state) => state.protocol.borrowerOp);

  const { isConnected, chain, address } = useAccount();
  const { paused } = useAscendCore();
  const { vmPaused, sunsetting, maxSystemDebt, defaultedDebt, getTotalActiveDebt, MCR } =
    useTroveManager();
  const { minNetDebt, CCR, getTCR, getGlobalSystemBalances } = useBorrowerOperations();
  const dispatch = useAppDispatch();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const defaultChainId = getDefaultChainId(chain);

  useWatchBlockNumber({
    chainId: chain?.id || defaultChainId,
    onBlockNumber(blockNumber) {
      dispatch(setLatestBlockNumber(blockNumber.toString()));
    },
  });

  useEffect(() => {
    if (isConnected && chain && address && activeVault) {
      const ascendCoreAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId || chain?.id].ASCEND_CORE;
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[
          activeVault.token.address as Address
        ].TROVE_MANAGER;
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId || chain?.id].BORROWER_OPERATIONS;

      paused(ascendCoreAddress).then((result) => {
        dispatch(setIsPaused(!!result));
      });

      vmPaused(troveManagerAddress).then((result) => {
        dispatch(setIsVmPaused(!!result));
      });

      sunsetting(troveManagerAddress).then((result) => {
        dispatch(setIsSunSetting(!!result));
      });

      maxSystemDebt(troveManagerAddress).then((result) => {
        dispatch(setMaxSystemDebt(result.toString()));
      });

      MCR(troveManagerAddress).then((result) => {
        dispatch(setMCR(result.toString()));
      });

      minNetDebt(borrowerOperationsAddress).then((result) => {
        dispatch(setMinNetDebt(result.toString()));
      });

      CCR(borrowerOperationsAddress).then((result) => {
        dispatch(setCCR(result.toString()));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault]);

  useEffect(() => {
    if (isConnected && chain && address && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[
          activeVault.token.address as Address
        ].TROVE_MANAGER;

      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId || chain?.id].BORROWER_OPERATIONS;

      defaultedDebt(troveManagerAddress).then((result) => {
        dispatch(setDefaultedDebt(result.toString()));
      });

      getTotalActiveDebt(troveManagerAddress).then((result) => {
        dispatch(setTotalActiveDebt(result.toString()));
      });

      getTCR(borrowerOperationsAddress).then((result) => {
        dispatch(setTCR(result.toString()));
      });

      getGlobalSystemBalances(borrowerOperationsAddress).then((result) => {
        dispatch(
          setGlobalSystemBalances({
            totalPricedCollateral: result[0].toString(),
            totalDebt: result[1].toString(),
          }),
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault, latestBlockNumber]);

  useEffect(() => {
    if (isConnected && chain && address) {
      const isRecovery: boolean = BigInt(TCR_value) < BigInt(CCR_value);
      dispatch(setIsRecoveryMode(isRecovery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault, CCR_value, TCR_value]);

  return <>{children}</>;
};

export default GlobalStateSetting;
