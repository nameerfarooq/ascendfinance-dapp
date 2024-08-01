/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";

import VaultCard from "@/components/VaultCard";

import ezETHIcon from "../../public/icons/ezETH.svg";
import vaultsIcon from "../../public/icons/vaultsIcon.svg";
import weETHIcon from "../../public/icons/weETH.svg";

const MintPage = () => {
  return (
    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto  mt-[70px]">
      <div className="px-5 flex gap-6 items-center">
        <Image className="brightness-0 invert" src={vaultsIcon} alt="Vaults Icon" width={24} />
        <p className="leading-[60px] font-bold text-[30px] text-whtie">Vaults</p>
      </div>
      <p className="px-5 text-[14px] text-white font-normal">
        Info about vaults and available LSTs etc. More coming in the future.
      </p>
      <hr className="border-[#647594] w-full my-12" />
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-2">
        <VaultCard
          iconImg={weETHIcon}
          symbol="weETH"
          name="EtherFi Restaked Ether"
          tvl="$328.34k"
          mintedBlue="299.99k/20.00m"
          minCollateralRation="130%"
          apr="5.99% - 8.99%"
          btnText="Choose weETH"
          learnMoreLink={"/"}
          infoSymbol="Renzo"
          btnAction={async () => {}}
        />
        <VaultCard
          iconImg={ezETHIcon}
          symbol="ezETH"
          name="Renzo Restaked Ether"
          tvl="$328.34k"
          mintedBlue="299.99k/20.00m"
          minCollateralRation="130%"
          apr="2.99%-3.99%"
          btnText="Choose ezETH"
          learnMoreLink={"/"}
          infoSymbol="Ether.fi"
          btnAction={async () => {}}
        />
      </div>
    </div>
  );
};

export default MintPage;
