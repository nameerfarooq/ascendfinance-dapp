"use client";

import { useEffect } from "react";
import type { FC, ReactNode } from "react";

import type { Address } from "viem";
import { useAccount, useWatchBlockNumber } from "wagmi";

import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import useAscendCore from "@/hooks/useAscendCore";
import useTroveManager from "@/hooks/useTroveManager";
import {
  setIsPaused,
  setIsSunSetting,
  setIsVmPaused,
  setLatestBlock,
} from "@/lib/features/protocol/protocolSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getDefaultChainId } from "@/utils/chain";

interface GlobalStateSettingProps {
  children: ReactNode;
}

const GlobalStateSetting: FC<GlobalStateSettingProps> = ({ children }) => {
  const activeVault = useAppSelector((state) => state.vault.activeVault);

  const { isConnected, chain, address } = useAccount();
  const { paused } = useAscendCore();
  const { vmPaused, sunsetting } = useTroveManager();
  const dispatch = useAppDispatch();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const defaultChainId = getDefaultChainId(chain);

  useWatchBlockNumber({
    chainId: chain?.id || defaultChainId,
    onBlockNumber(blockNumber) {
      console.log("New blockNumber", blockNumber);
      dispatch(setLatestBlock(blockNumber.toString()));
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

      paused(ascendCoreAddress).then((result) => {
        dispatch(setIsPaused(!!result));
      });

      vmPaused(troveManagerAddress).then((result) => {
        dispatch(setIsVmPaused(!!result));
      });

      sunsetting(troveManagerAddress).then((result) => {
        dispatch(setIsSunSetting(!!result));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault]);

  return <>{children}</>;
};

export default GlobalStateSetting;
