"use client";

import { useState } from "react";

import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import ezETHIcon from "../../../public/icons/ezETH.svg";
import mintIcon from "../../../public/icons/mintIcon.svg";
import weETHIcon from "../../../public/icons/weETH.svg";
const MintPage = () => {
  const [showVaults, setshowVaults] = useState(false);
  const [zap, setZap] = useState(0);
  const handleShowVaults = () => {
    setshowVaults(!showVaults);
  };
  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="bg-baseColor rounded-3xl w-[95%] mt-36 mb-22 sm:my-[10px] sm:w-[70%] xl:w-[80%] 2xl:w-[40%]">
        <div className="pt-6 pb-16 px-12">
          <div className="flex items-center gap-6">
            <Image alt="Mint icon" src={mintIcon} width={30} className="brightness-0 invert" />
            <p className="font-bold leading-[60px] text-[30px] text-white">Mint BLUE</p>
          </div>
          <p className="text-[14px] leading-[24px]">
            To mint (borrow) BLUE, you are required to deposit a specific amount of collateral using
            the Ascend platform, or have a pre-existing balance of ETH or stETH within the Ascend
            Protocol. You can then generate BLUE against your collateral up to a maximum collateral
            ratio of 170%.
          </p>
        </div>
        <hr className="border-lightGray2" />
        <div className="flex flex-col gap-6 px-12 py-14">
          <div className="flex justify-between gap-3 flex-wrap">
            <div
              onClick={handleShowVaults}
              className="flex flex-col gap-3 w-4/12 cursor-pointer relative"
            >
              <p className="font-medium text-[12px] leading-[24px]">Vault</p>
              <div className="rounded-2xl bg-secondaryColor py-3 px-8 flex justify-between gap-2 items-center">
                <div className="flex items-center gap-3">
                  <Image src={weETHIcon} width={30} alt="token icon" />
                  <p className="font-bold text-[18px] leading-[36px]">weETH</p>
                </div>
                {showVaults ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
              </div>
              {showVaults && (
                <div className="absolute z-30 bg-secondaryColor -bottom-[105px] left-0 w-full border rounded-2xl border-[#647594]">
                  <div className="flex items-center py-2 px-8 gap-3 rounded-t-2xl hover:bg-primaryColor">
                    <Image src={weETHIcon} width={30} alt="token icon" />
                    <p className="font-bold text-[18px] leading-[36px]">weETH</p>
                  </div>
                  <div className="flex items-center py-2 px-8 gap-3 rounded-b-2xl hover:bg-primaryColor">
                    <Image src={ezETHIcon} width={30} alt="token icon" />
                    <p className="font-bold text-[18px] leading-[36px]">ezETH</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 w-5/12 cursor-pointer relative">
              <p className="font-medium text-[12px] leading-[24px]">Zap</p>
              <div className="rounded-2xl bg-secondaryColor flex items-center mt-3">
                <div
                  onClick={() => setZap(0)}
                  className={`${zap == 0 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                >
                  Off
                </div>
                <div
                  onClick={() => setZap(1)}
                  className={`${zap == 1 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                >
                  ETH
                </div>
                <div
                  onClick={() => setZap(2)}
                  className={`${zap == 2 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                >
                  wETH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
