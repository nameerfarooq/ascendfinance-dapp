/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { setLoader } from "./lib/features/loaderSlice";
import ezETHIcon from "../../public/icons/ezETH.svg";
import vaultsIcon from "../../public/icons/vaultsIcon.svg";
import weETHIcon from "../../public/icons/weETH.svg";
const MintPage = () => {
  const dispatch = useDispatch();
  const setLoaderTrue = async () => {
    dispatch(
      setLoader({
        loading: true,
        text1: "Minting",
        text2: "123123 Blue",
      }),
    );
  };
  // setLoaderTrue();
  return (
    <div className="w-[80%] mx-auto mt-[150px]">
      <div className="px-5 flex gap-6 items-center">
        <Image className="brightness-0 invert" src={vaultsIcon} alt="Vaults Icon" width={24} />
        <p className="leading-[60px] font-bold text-[30px] text-whtie">Vaults</p>
      </div>
      <p className="px-5 text-[14px] text-white font-normal">
        Info about vaults and available LSTs etc. More coming in the future.
      </p>
      <hr className="border-[#647594] w-full my-12" />
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-baseColor rounded-[20px]">
          <div className="py-8 px-12 flex gap-8 items-center">
            <Image src={weETHIcon} alt="weETH icon" width={55} />
            <div className="flex flex-col gap-0">
              <p className="font-bold text-[24px] leading-[28px]">weETH</p>
              <p className="font-medium text-[12px] leading-[24px]">EtherFi Restaked Ether</p>
            </div>
          </div>
          <hr className=" border-[#647594]" />
          <div className="py-4 px-12"></div>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
