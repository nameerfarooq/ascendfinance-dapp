"use client";

import { useState } from "react";

import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";

import ezETHIcon from "../../../public/icons/ezETH.svg";
import mintIcon from "../../../public/icons/mintIcon.svg";
import weETHIcon from "../../../public/icons/weETH.svg";
const MintPage = () => {
  const [showVaults, setshowVaults] = useState(false);
  const [zap, setZap] = useState(0);
  const [debt, setDebt] = useState(0);
  const handleShowVaults = () => {
    setshowVaults(!showVaults);
  };
  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="bg-baseColor shadowCustom rounded-3xl w-[95%] mt-[60px!important] mb-22 sm:my-[10px] sm:w-[70%] xl:w-[80%] 2xl:w-[40%]">
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
          <div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-[12px] leading-[24px]">Deposit</p>
              <p className="font-medium text-[12px] leading-[24px]">
                Wallet: <span className="font-extrabold"> 2.03</span> weETH
              </p>
            </div>
            <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-8 text-lightGray flex justify-between gap-2 items-center">
              <input
                type="number"
                placeholder="1.000 weETH"
                className="bg-transparent placeholder:text-lightGray outline-none border-none font-medium text-[18px] leading-[36px]"
              />
              <div className="flex items-center gap-28 font-medium text-[14px] leading-[28px]">
                <p>= $3 929.00</p>
                <button className="font-bold">Max</button>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 mt-6 border-primaryColor py-8 px-8 flex flex-col gap-6 font-medium text-[12px] leading-[24px]">
            <div>
              <p>Debt</p>
              <div className="flex justify-between items-center">
                <div className="rounded-2xl bg-secondaryColor flex items-center w-[160px]">
                  <div
                    onClick={() => setDebt(0)}
                    className={`${debt == 0 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                  >
                    Auto
                  </div>
                  <div
                    onClick={() => setDebt(1)}
                    className={`${debt == 1 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                  >
                    Custom
                  </div>
                </div>
                <input
                  type="text"
                  defaultValue={"130%"}
                  className="bg-secondaryColor outline-none  rounded-2xl w-[150px] py-2 px-6 flex justify-center items-center text-white text-center"
                />
              </div>
            </div>
            <div>
              <p>Mint</p>

              <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-8 text-lightGray flex justify-between gap-2 items-center">
                <input
                  type="number"
                  placeholder="1.000 weETH"
                  className="placeholder:text-lightGray bg-transparent outline-none border-none font-medium text-[18px] leading-[36px]"
                />
                <div className="flex items-center gap-28 font-medium text-[14px] leading-[28px]">
                  <button className="font-bold text-lightGray">Max</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <ButtonStyle1 text="Approve weETH" action={async () => {}} disabled={false} />
          </div>
        </div>
        <hr className="border-lightGray2" />
        <div className="flex flex-col gap-1 py-8 px-12 font-medium text-lightGray text-[12px] leading-[24px]">
          <p className="text-white font-bold">Additional Info</p>
          <div className="flex items-center justify-between">
            <p>Vault position</p>
            <p>1/14</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Debt in front</p>
            <p>0.0 BLUE</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Collateral Ratio</p>
            <p className="text-primaryColor">130%</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Liquidation Price</p>
            <p className="text-primaryColor">$ 4100.34</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Remaining Mintable BLUE</p>
            <p>93,999,999.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
