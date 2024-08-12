/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import PositionCard from "@/components/PositionCard";

import ezETHIcon from "../../../public/icons/ezETH.svg";
import postionsIcon from "../../../public/icons/positionsIcon.svg";
import weETHIcon from "../../../public/icons/weETH.svg";

const Page = () => {
  const router = useRouter()
  const [positionsAvailable, setpositionsAvailable] = useState(false);
  const goToManagePositions = () => {
    router.push('/positions/123')
  }

  useEffect(() => {
    setpositionsAvailable(true);
  }, []);
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
          {!positionsAvailable ? (
            <div className="h-[250px] w-full flex items-center justify-center">
              <p className="font-bold text-[18px] leading-[36px]">
                You currently have no positions.
              </p>
            </div>
          ) : (
            <>
              <div className="gap-4 lg:px-12 hidden sm:flex items-center justify-around px-6 sm:px-12 ">
                <div className="flex-[2] text-center">
                  Vault
                </div>
                <div className="flex-1 text-center">
                  Collateral
                </div>
                <div className="flex-1 text-center">
                  Minted
                </div>
                <div className="flex-1 text-center">
                  CR
                </div>
                <div className="flex-1">

                </div>
              </div>
              <PositionCard
                icon={weETHIcon}
                symbol="weETH"
                tokenName="EtherFi Restaked Ether"
                collateral="1.500 weETH"
                mintedValue="2930.28 BLUE"
                collateralRatio="129%"
                ManageAction={async () => { goToManagePositions() }}
              />
              <PositionCard
                icon={ezETHIcon}
                symbol="ezETH"
                tokenName="Renzo Restaked Ether"
                collateral="3.543 ezETH"
                mintedValue="12 930.93 BLUE"
                collateralRatio="339%"
                ManageAction={async () => { goToManagePositions() }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
