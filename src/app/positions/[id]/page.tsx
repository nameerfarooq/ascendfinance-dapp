"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import DepositPosition from "@/components/DepositPosition";
import MintPosition from "@/components/MintPosition";
import RepayPosition from "@/components/RepayPosition";
import WithdrawPosition from "@/components/WithdrawPosition";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import vaultsList from "@/constants/vaults";
import useTroveManager from "@/hooks/useTroveManager";
import { setActiveVault } from "@/lib/features/vault/vaultSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { PositionStatsType, VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";
import { formatDecimals } from "@/utils/formatters";

import gearIcon from "../../../../public/icons/gearIcon.svg";
import goBackIcon from "../../../../public/icons/goBackIcon.svg";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isConnected, address, chain } = useAccount();
  const { getTroveCollSharesAndDebt, convertSharesToYieldTokens, fetchPriceInUsd, getCurrentICR } =
    useTroveManager();

  const [tab, setTab] = useState(0);
  const [activeVault, setActiveVaultState] = useState<VaultType>();
  const [positionStats, setPositionStats] = useState<PositionStatsType>({
    id: params.id as Address,
    collateral: "0",
    debt: "0",
    collateralRatio: "-",
  });

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const nativeVaultsList = vaultsList[appBuildEnvironment];
  const defaultChainId = getDefaultChainId(chain);

  const getSinglePositionStats = async (
    vaultId: Address,
  ): Promise<PositionStatsType | undefined | void> => {
    try {
      if (isConnected && address && chain?.id && vaultId) {
        const troveManagerAddress: Address =
          CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId].troves[vaultId].TROVE_MANAGER;

        const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
          troveManagerAddress,
          address,
        );

        const yieldTokens = await convertSharesToYieldTokens(
          troveManagerAddress,
          troveCollSharesAndDebt[0],
        );

        const priceInUSD = await fetchPriceInUsd(troveManagerAddress);

        const currentICR = await getCurrentICR(troveManagerAddress, address, priceInUSD);

        return {
          id: vaultId,
          collateral: formatDecimals(parseFloat(formatUnits(yieldTokens, 18)), 2),
          debt: formatDecimals(parseFloat(formatUnits(troveCollSharesAndDebt[1], 18)), 2),
          collateralRatio: formatDecimals(parseFloat(formatUnits(currentICR * 100n, 18)), 2),
        };
      }
    } catch (error) {
      console.log("Error in fetching individual positions stats: ", vaultId, "\n", error);
    }
  };

  useEffect(() => {
    if (isConnected && address && chain && params && params.id) {
      setActiveVaultState(nativeVaultsList[defaultChainId][params.id]);
      dispatch(setActiveVault(nativeVaultsList[defaultChainId][params.id]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, params, nativeVaultsList, defaultChainId]);

  useEffect(() => {
    if (isConnected && address && chain && params && params.id) {
      getSinglePositionStats(params.id as Address).then((result) => {
        if (result) {
          setPositionStats(result);
        } else {
          setPositionStats({
            id: params.id as Address,
            collateral: "0",
            debt: "0",
            collateralRatio: "-",
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, params]);

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="relative bg-baseColor shadowCustom rounded-3xl w-[90%] mt-[50px] md:w-[70%] xl:w-[45%]  2xl:w-[35%]">
        <div
          onClick={() => {
            router.push("/positions");
          }}
          className="static w-max mx-5 my-2 lg:absolute -left-[115px] shadow-xl top-0 rounded-full p-5 sm:p-10 bg-secondaryColor lg:bg-baseColor cursor-pointer hover:bg-primaryColor"
        >
          <Image
            src={goBackIcon}
            alt="Go back Icon"
            className="w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] object-contain"
          />
        </div>

        <div className="pt-6 pb-16 px-4 sm:px-12">
          <div className="flex items-center gap-3">
            <Image alt="Positions icon" src={gearIcon} width={36} className="brightness-0 invert" />
            <p className="font-bold leading-[40px] sm:leading-[60px] text-[20px] sm:text-[30px] text-white">
              Manage position
            </p>
          </div>

          <p className="text-[14px] leading-[24px]">
            By managing your collateral ratio, you will reduce your exposure to price fluctuations
            and risk of liquidation.{" "}
          </p>
        </div>

        <hr className="border-lightGray2" />

        <div className="py-12 px-4 sm:px-12">
          <div className="flex justify-between gap-3 items-center flex-wrap ">
            <div className="flex items-center gap-2">
              <Image alt="Coin symbol" src={activeVault?.token.logoURI || ""} width={50} />
              <div className="flex flex-col">
                <p className="font-bold text-[24px]">{activeVault?.token.symbol || ""}</p>
                <p className="font-medium text-[12px]">{activeVault?.token.name || ""}</p>
              </div>
            </div>
            <p className="font-bold text-[20px] leading-[40px]">-</p>
          </div>

          <div className="flex flex-col gap-4 my-12 text-[12px] text-lightGray font-medium">
            <div className="flex gap-2 justify-between items-center">
              <p className="font-medium">Minted</p>
              <p className="font-bold">{positionStats.debt} GREEN</p>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <p>Collateral Ratio</p>
              <p className="text-primaryColor">
                {positionStats.collateralRatio}
                {positionStats.collateralRatio ? "%" : ""}
              </p>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <p>Liquidation Price</p>
              <p className="text-[#FF5710]">-</p>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <p>Vault Position</p>
              <p>1/2</p>
            </div>
          </div>

          <div className="flex rounded-2xl bg-secondaryColor text-primaryColor text-[14px] leading-[28px] font-medium text-center">
            <button
              onClick={() => setTab(0)}
              className={`${tab === 0 && "bg-primaryColor text-white"} rounded-2xl flex-1 py-2 flex items-center justify-center`}
            >
              Deposit
            </button>
            <button
              onClick={() => setTab(1)}
              className={`${tab === 1 && "bg-primaryColor text-white"} rounded-2xl flex-1 py-2 flex items-center justify-center`}
            >
              Mint
            </button>
            <button
              onClick={() => setTab(2)}
              className={`${tab === 2 && "bg-primaryColor text-white"} rounded-2xl flex-1 py-2 flex items-center justify-center`}
            >
              Withdraw
            </button>
            <button
              onClick={() => setTab(3)}
              className={`${tab === 3 && "bg-primaryColor text-white"} rounded-2xl flex-1 py-2 flex items-center justify-center`}
            >
              Repay
            </button>
          </div>

          {tab === 0 && <DepositPosition activeVault={activeVault} />}
          {tab === 1 && <MintPosition activeVault={activeVault} />}
          {tab === 2 && <WithdrawPosition activeVault={activeVault} collateralRatio={positionStats?.collateralRatio}/>}
          {tab === 3 && <RepayPosition activeVault={activeVault} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
