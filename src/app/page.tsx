/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { setLoader } from "./lib/features/loaderSlice";
import ezETHIcon from "../../public/icons/ezETH.svg";
import vaultsIcon from "../../public/icons/vaultsIcon.svg";
import weETHIcon from "../../public/icons/weETH.svg";
import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import VaultCard from "@/components/VaultCard";
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
    <div className="w-[70%] mx-auto mt-[150px]">
      <div className="px-5 flex gap-6 items-center">
        <Image className="brightness-0 invert" src={vaultsIcon} alt="Vaults Icon" width={24} />
        <p className="leading-[60px] font-bold text-[30px] text-whtie">Vaults</p>
      </div>
      <p className="px-5 text-[14px] text-white font-normal">
        Info about vaults and available LSTs etc. More coming in the future.
      </p>
      <hr className="border-[#647594] w-full my-12" />
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <VaultCard
          iconImg={weETHIcon}
          symbol="weETH"
          name="EtherFi Restaked Ether"
          tvl="$328.34k"
          mintedBlue="299.99k/20.00m"
          minCollateralRation="130%"
          apr="5.99% - 8.99%"
          btnText="Choose weETH"
          btnAction={() => {}}
        />
      </div>
    </div>
  );
};

export default MintPage;
