/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

import Image from "next/image";

import PositionCard from "@/components/PositionCard";

import ezETHIcon from "../../../public/icons/ezETH.svg";
import postionsIcon from "../../../public/icons/positionsIcon.svg";
import weETHIcon from "../../../public/icons/weETH.svg";

const Page = () => {
  const [positionsAvailable, setpositionsAvailable] = useState(true);
  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="bg-baseColor shadowCustom rounded-3xl w-[90%] mt-36 mb-22 sm:my-[10px] sm:w-[70%] xl:w-[80%] 2xl:w-[40%]">
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
        <div className="py-12  px-6 sm:px-12 flex-wrap lg:flex-nowrap flex gap-8">
          {!positionsAvailable ? (
            <div className="h-[250px] w-full flex items-center justify-center">
              <p className="font-bold text-[18px] leading-[36px]">
                You currently have no positions.
              </p>
            </div>
          ) : (
            <>
              <PositionCard
                icon={weETHIcon}
                symbol="weETH"
                tokenName="EtherFi Restaked Ether"
                collateral="1.500 weETH"
                mintedValue="2930.28 BLUE"
                collateralRatio="129%"
                liquidationPrice="$3029.39 / ETH"
                withdrawAction={async () => {}}
                repayAction={async () => {}}
              />
              <PositionCard
                icon={ezETHIcon}
                symbol="ezETH"
                tokenName="Renzo Restaked Ether"
                collateral="3.543 ezETH"
                mintedValue="12 930.93 BLUE"
                collateralRatio="339%"
                liquidationPrice="$3029.39 / ETH"
                withdrawAction={async () => {}}
                repayAction={async () => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
