"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import CollateralTypeCard from "@/components/CollateralTypeCard";
import RedeemListItem from "@/components/RedeemListItem";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import vaultsList from "@/constants/vaults";
import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { useAppSelector } from "@/lib/hooks";
import type { VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";
import { formatDecimals } from "@/utils/formatters";

import redeemIcon from "../../../public/icons/redeemIcon.svg";




const Page = () => {

  const { balanceOf } = useERC20Contract();
  const { chain, isConnected, address } = useAccount();
  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const defaultChainId: number = getDefaultChainId(chain);
  const nativeVaultsList = vaultsList[appBuildEnvironment];
  const priceInUSD = useAppSelector((state: any) => state.protocol.priceInUSD);
  const {

    troveOwnersCount,
  } = useAppSelector((state) => state.protocol.trove);
  const { getRedemptionHints, getApproxHint } = useMultiCollateralHintHelpers()
  const { findInsertPosition } = useSortedTroves();
  const { redeemCollateral } = useTroveManager()


  const [tokenBalance, setTokenBalance] = useState("");
  const [activeVault, setActiveVault] = useState<VaultType | undefined>();
  const [showCollateralSelectionCard, setshowCollateralSelectionCard] = useState(false);
  const [redeemValue, setRedeemValue] = useState('')




  const handleShowCollateralCard = () => {
    setshowCollateralSelectionCard(!showCollateralSelectionCard);
  };
  const setRedeemValueToMax = () => {
    setRedeemValue(tokenBalance)
  }
  const fetchTokenbalance = (tokenAddress: Address, walletAddress: Address) => {
    if (address) {
      balanceOf(tokenAddress, walletAddress).then((balance: bigint) => {
        setTokenBalance(balance.toString());
      });
    }
  };

  useEffect(() => {
    if (nativeVaultsList && isConnected && defaultChainId && chain) {

      console.log("nativeVaultsList[defaultChainId] :", nativeVaultsList[defaultChainId])
      const vaultIds = Object.keys(nativeVaultsList[chain?.id]);

      setActiveVault(nativeVaultsList[defaultChainId][vaultIds[0]])
    }
  }, [nativeVaultsList, defaultChainId, chain, isConnected])

  useEffect(() => {
    if (activeVault && address) {
      fetchTokenbalance(activeVault?.token.address, address)
    }
  }, [activeVault, address])


  const getTokensRedeemed = async (multiCollateralHintHelpersAddress: Address,
    troveManagerAddress: Address, sortedTrovesAddress: Address) => {
    if (activeVault) {

      //step 1
      const redemptionHints = await getRedemptionHints(
        multiCollateralHintHelpersAddress,
        troveManagerAddress,
        parseUnits(redeemValue, activeVault?.token.decimals), //debtAmount
        priceInUSD, //_price
        BigInt('0')//maxIterations
      )
      console.log("redemptionHints :", redemptionHints)
      console.log("redemptionHints 0:", redemptionHints[0])
      console.log("redemptionHints 1:", redemptionHints[1])
      console.log("redemptionHints 2:", redemptionHints[2])

      //step 2
      console.log("troveOwnersCount :", troveOwnersCount)

      //step 3
      const numTrials = Math.ceil(15 * Math.sqrt(Number(troveOwnersCount)));
      const inputRandomSeed = BigInt(Math.ceil(Math.random() * 100000));

      const approxHint = await getApproxHint(
        multiCollateralHintHelpersAddress,
        troveManagerAddress,
        redemptionHints[1], //NICR
        numTrials.toString(),
        inputRandomSeed,
      );
      console.log("approxHint: ", approxHint);

      //step 4
      const insertPosition = await findInsertPosition(
        sortedTrovesAddress,
        redemptionHints[1], //
        approxHint[0],
        approxHint[0],
      );
      console.log("insertPosition: ", insertPosition);

      //step 5

      const tx = await redeemCollateral(
        troveManagerAddress,
        activeVault,
        parseUnits(redeemValue, activeVault?.token.decimals), //debtAmount
        redemptionHints[0],
        insertPosition[0],
        insertPosition[1],
        redemptionHints[1],
        BigInt('0'),
        BigInt('1000000000000000000')
      )
      console.log("tx: ", tx);

    }
  }


  const handleCtaFunctions = () => {
    if (address && chain && activeVault) {
      // const borrowerOperationsAddress: Address =
      //   CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;
      const multiCollateralHintHelpersAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].MULTI_COLLATERAL_HINT_HELPERS;
      const sortedTrovesAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .SORTED_TROVES;
      getTokensRedeemed(
        multiCollateralHintHelpersAddress,
        troveManagerAddress,
        sortedTrovesAddress
      )
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      {showCollateralSelectionCard && (
        <CollateralTypeCard handleShowCollateralCard={handleShowCollateralCard} setActiveVault={setActiveVault} />
      )}
      <div className="bg-baseColor shadowCustom rounded-3xl w-[90%] mt-[50px] md:mt-[10px]  lg:w-[70%]  xl:w-[65%] 2xl:w-[55%] ">
        <div className="pt-6 pb-10 px-12">
          <div className="flex items-center gap-6">
            <Image alt="Mint icon" src={redeemIcon} width={30} className="brightness-0 invert" />
            <p className="font-bold leading-[26px] text-[22px] sm:leading-[48px] sm:text-[24px] text-white">
              Redeem GREEN for collateral
            </p>
          </div>
          <p className="text-[14px] leading-[24px]">
            If you have borrowed eUSD from Lybra Protocol, you may want to repay some of your debt
            to increase your collateral Ratio. Your funds will become more stable and safe by doing
            this. However, you won't be able to continue earning yield from this part of the eUSD
            once you pay it back.
          </p>
        </div>
        <hr className="border-lightGray2" />
        <div className="flex gap-8 md:gap-16 py-14 px-4 md:px-12 flex-wrap-reverse md:flex-nowrap">
          <div className="w-full md:w-6/12 flex flex-col justify-between">
            <div>
              <p className="font-medium text-[12px] leading-[24px]">Collateral type</p>
              <div
                onClick={handleShowCollateralCard}
                className="cursor-pointer rounded-2xl bg-secondaryColor py-3 px-5 sm:px-8 flex justify-between gap-2 items-center"
              >
                <div className="flex items-center gap-3">
                  <Image src={activeVault?.token.logoURI || ''} width={30} alt="token icon" />
                  <p className="font-bold text-[18px] leading-[36px]">{activeVault?.token.symbol}</p>
                </div>
                {showCollateralSelectionCard ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center flex-wrap">
                  <p className="font-medium text-[12px] leading-[24px]">Redeem GREEN</p>
                  <p className="font-medium text-[12px] leading-[24px]">
                    Available: <span className="font-extrabold"> {formatDecimals(Number(tokenBalance), 2) || '0'}</span> GREEN
                  </p>
                </div>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                  <input
                    value={redeemValue}
                    onChange={(e) => setRedeemValue(e.target.value)}
                    type="number"
                    placeholder="1.000"
                    className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-full"
                  />
                  {tokenBalance &&
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                      <button onClick={setRedeemValueToMax} className="font-bold">Max</button>
                    </div>
                  }
                </div>
              </div>
              <div className="mt-8 flex justify-end items-center">
                <div className="rounded-lg bg-[#FF5710] px-12 text-center text-[12px] leading-[24px] text-white font-bold">
                  Not Profitable
                </div>
              </div>
              <div className="flex flex-col gap-1 py-4 font-medium text-lightGray text-[12px] leading-[24px]">
                <p className="text-white font-bold">Transaction overview</p>
                <div className="flex items-center justify-between gap-2">
                  <p>Collateral Ratio</p>
                  <p>∞</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p>Gas $4.45</p>
                  <p>{`Liquidation at < 150%`}</p>
                </div>
              </div>
            </div>

            <div className="mt-[60px] md:mt-0">
              <ButtonStyle1 disabled={false} text="Redeem" action={handleCtaFunctions} />
            </div>
          </div>
          <hr className="border-lightGray2 w-full my-[20px] md:hidden" />

          <div className="w-full md:w-6/12 max-h-[415px] overflow-y-auto">
            <div className="flex sticky  top-0 bg-baseColor items-center gap-3 px-4 sm:px-8 font-medium text-white text-[12px] leading-[24px]">
              <div className="flex-1">Owner</div>
              <div className="flex-1">Cr</div>
              <div className="flex-1">Debt</div>
              <div className="flex-1">New Debt</div>
            </div>
            <div className="flex flex-col gap-5 mt-2">
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
              <RedeemListItem
                walletAddress="x0000...0000"
                Cr="120%"
                Debt="23,93k"
                NewDebt="23,93k"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
