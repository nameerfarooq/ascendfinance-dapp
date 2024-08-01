"use client";
import { useState } from "react";

import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import CollateralTypeCard from "@/components/CollateralTypeCard";
import RedeemListItem from "@/components/RedeemListItem";

import redeemIcon from "../../../public/icons/redeemIcon.svg";
import weETHIcon from "../../../public/icons/weETH.svg";

const Page = () => {
  const [showCollateralSelectionCard, setshowCollateralSelectionCard] = useState(false);
  const handleShowCollateralCard = () => {
    setshowCollateralSelectionCard(!showCollateralSelectionCard);
  };
  return (
    <div className="flex items-center justify-center min-h-full w-full">
      {showCollateralSelectionCard && (
        <CollateralTypeCard handleShowCollateralCard={handleShowCollateralCard} />
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
                  <Image src={weETHIcon} width={30} alt="token icon" />
                  <p className="font-bold text-[18px] leading-[36px]">weETH</p>
                </div>
                {showCollateralSelectionCard ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-[12px] leading-[24px]">Redeem GREEN</p>
                  <p className="font-medium text-[12px] leading-[24px]">
                    Available: <span className="font-extrabold"> 2000</span> GREEN
                  </p>
                </div>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                  <input
                    type="number"
                    placeholder="1.000"
                    className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                  />
                  <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                    <button className="font-bold">Max</button>
                  </div>
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
              <ButtonStyle1 disabled={false} text="Redeem" action={async () => {}} />
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
