"use client";

import { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatUnits, isAddress, type Address } from "viem";
import { useAccount } from "wagmi";

import PositionCard from "@/components/PositionCard";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import vaultsList from "@/constants/vaults";
import useTroveManager from "@/hooks/useTroveManager";
import { useAppSelector } from "@/lib/hooks";
import type { PositionStatsType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";
import { formatDecimals } from "@/utils/formatters";

import postionsIcon from "../../../public/icons/positionsIcon.svg";

const Page = () => {
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const {troveCollateralShares, troveDebt} = useAppSelector((state) => state.protocol.trove);

  const router = useRouter();
  const { isConnected, address, chain } = useAccount();
  const {
    getTroveStatus,
    // getTroveCollSharesAndDebt,
    convertSharesToYieldTokens,
    // fetchPriceInUsd,
    getCurrentICR,
  } = useTroveManager();

  const [vaultStatusList, setVaultStatusList] = useState<{ [x: Address]: bigint }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeVaultCount, setActiveVaultCount] = useState<number>(0);
  const [positionStats, setPositionStats] = useState<{ [x: Address]: PositionStatsType }>({});

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const nativeVaultsList = vaultsList[appBuildEnvironment];
  const defaultChainId = getDefaultChainId(chain);

  const managePosition = (vaultId: string) => {
    if (isConnected && isAddress(vaultId)) {
      router.push(`/positions/${vaultId}`);
    }
  };

  const getSinglePositionStats = async (
    vaultId: Address,
  ): Promise<PositionStatsType | undefined | void> => {
    try {
      if (isConnected && address && chain?.id && vaultId) {
        const troveManagerAddress: Address =
          CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId].troves[vaultId].TROVE_MANAGER;

        // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
        //   troveManagerAddress,
        //   address,
        // );

        const yieldTokens = await convertSharesToYieldTokens(
          troveManagerAddress,
          BigInt(troveCollateralShares),
        );

        // const priceInUSD = await fetchPriceInUsd(troveManagerAddress);

        const currentICR = await getCurrentICR(troveManagerAddress, address, BigInt(priceInUSD));

        return {
          id: vaultId,
          collateral: formatDecimals(parseFloat(formatUnits(yieldTokens, 18)), 2),
          debt: formatDecimals(parseFloat(formatUnits(BigInt(troveDebt), 18)), 2),
          collateralRatio: formatDecimals(parseFloat(formatUnits(currentICR * 100n, 18)), 2),
        };
      }
    } catch (error) {
      console.log("Error in fetching individual positions stats: ", vaultId, "\n", error);
    }
  };

  const getAllPositionStats = (vaultIds: Address[]) => {
    try {
      if (isConnected && address && chain?.id && vaultIds.length) {
        let posStatsObj = {};
        const promises: unknown[] = [];

        vaultIds.map((vaultId) => {
          const request = getSinglePositionStats(vaultId);
          promises.push(request);
        });

        Promise.all(promises).then((res) => {
          for (const item of res as PositionStatsType[] | undefined[] | void[]) {
            if (item && item.id) {
              posStatsObj = { ...posStatsObj, [item.id]: item };
            }
          }

          setPositionStats(posStatsObj);
          setIsLoading(false);
        });
      }
    } catch (error) {
      console.log("getAllPositionStats(): ", error);
    }
  };

  useEffect(() => {
    if (isConnected && address && chain && chain.id) {
      const vaultIds = Object.keys(nativeVaultsList[chain?.id]);
      let vaultStatusObj = {};

      vaultIds.map(async (vaultId) => {
        const troveManagerAddress: Address =
          CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[vaultId as Address]
            .TROVE_MANAGER;

        await getTroveStatus(troveManagerAddress, address).then((status) => {
          if (status === 1n) {
            setActiveVaultCount((prev) => prev + 1);
          }

          vaultStatusObj = { ...vaultStatusObj, [vaultId]: status };
          setVaultStatusList(vaultStatusObj);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, nativeVaultsList, appBuildEnvironment]);

  useEffect(() => {
    if (isConnected && address && chain && chain.id && Object.keys(vaultStatusList).length) {
      getAllPositionStats(Object.keys(vaultStatusList) as Address[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, nativeVaultsList, vaultStatusList]);

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="bg-baseColor shadowCustom rounded-3xl w-[90%] mt-[50px] md:mt-[0px] md:w-[80%] xl:w-[65%]  2xl:w-[50%]">
        <div className="pt-6 pb-16 px-12">
          <div className="flex items-center gap-6">
            <Image
              alt="Positions icon"
              src={postionsIcon}
              width={20}
              className="brightness-0 invert"
            />
            <p className="font-bold leading-[60px] text-[30px] text-white">Positions</p>
          </div>
          <p className="text-[14px] leading-[24px]">
            By withdrawing collateral, you will get your deposited LST back and reduce your exposure
            to price fluctuations. However, this also means that your collateral Ratio drops and you
            may face liquidation if the price of ETH falls below a certain threshold. You should
            always monitor your loan and keep a healthy collateral Ratio to avoid losing your funds.
          </p>
        </div>
        <hr className="border-lightGray2" />

        <div className="py-10 px-6 sm:px-12 flex flex-col gap-8">
          {isConnected ? (
            <Fragment>
              {!isLoading ? (
                <Fragment>
                  {activeVaultCount > 0 ? (
                    <Fragment>
                      <div className="gap-4 lg:px-12 hidden sm:flex items-center justify-around px-6 sm:px-12 ">
                        <div className="flex-[2] text-center">Vault</div>
                        <div className="flex-1 text-center">Collateral</div>
                        <div className="flex-1 text-center">Minted</div>
                        <div className="flex-1 text-center">CR</div>
                        <div className="flex-1"></div>
                      </div>

                      {Object.keys(nativeVaultsList[defaultChainId]).map((vaultId) => {
                        if (vaultStatusList[vaultId as Address] === 1n) {
                          return (
                            <PositionCard
                              key={vaultId}
                              icon={nativeVaultsList[defaultChainId][vaultId].token.logoURI}
                              symbol={nativeVaultsList[defaultChainId][vaultId].token.symbol}
                              tokenName={nativeVaultsList[defaultChainId][vaultId].token.name}
                              collateral={positionStats[vaultId as Address]?.collateral || "-"}
                              mintedValue={positionStats[vaultId as Address]?.debt || "-"}
                              collateralRatio={`${positionStats[vaultId as Address]?.collateralRatio || "0"}%`}
                              ManageAction={() => managePosition(vaultId)}
                            />
                          );
                        }
                      })}
                    </Fragment>
                  ) : (
                    <div className="h-[250px] w-full flex items-center justify-center">
                      <p className="font-bold text-[18px] leading-[36px]">
                        You currently have no positions.
                      </p>
                    </div>
                  )}
                </Fragment>
              ) : (
                <div className="h-[250px] w-full flex items-center justify-center">
                  <p className="font-bold text-[18px] leading-[36px]">Positions are loading...</p>
                </div>
              )}
            </Fragment>
          ) : (
            <div className="h-[250px] w-full flex items-center justify-center">
              <p className="font-bold text-[18px] leading-[36px]">Connect Wallet to see positions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
