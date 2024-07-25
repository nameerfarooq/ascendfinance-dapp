/* eslint-disable react/jsx-no-undef */
import React, { type ReactEventHandler } from "react";

import Image from "next/image";

import ButtonStyle1 from "./Buttons/ButtonStyle1";

interface VaultCardProps {
  iconImg: string;
  symbol: string;
  name: string;
  tvl: string;
  mintedBlue: string;
  minCollateralRation: string;
  apr: string;
  btnText: string;
  btnAction: ReactEventHandler;
}
const VaultCard: React.FC<VaultCardProps> = ({
  iconImg,
  symbol,
  name,
  tvl,
  mintedBlue,
  minCollateralRation,
  apr,
  btnText,
  btnAction,
}) => {
  return (
    <div className="bg-baseColor rounded-[20px] vault-card">
      <div className="py-8 px-12 flex gap-6 items-center">
        <Image src={iconImg} alt="icon" width={55} />
        <div className="flex flex-col gap-0">
          <p className="font-bold text-[24px] leading-[28px]">{symbol}</p>
          <p className="font-medium text-[12px] leading-[24px]">{name}</p>
        </div>
      </div>
      <hr className=" border-[#647594]" />
      <div className="py-8 px-12">
        <div className="text-lightGray">
          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Total value locked</p>
            <p className="font-bold text-[12px] leading-[24px]">{tvl}</p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Minted BLUE</p>
            <p className="font-bold text-[12px] leading-[24px]">{mintedBlue}</p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Minimum collateral ratio</p>
            <p className="font-bold text-[12px] leading-[24px]">{minCollateralRation}</p>
          </div>
        </div>
        <p className="text-center font-medium text-[16px] leading-[32px] my-6">
          APR <span className="font-bold"> {apr}</span>
        </p>
        <ButtonStyle1 text={btnText} action={btnAction} />
      </div>
    </div>
  );
};

export default VaultCard;
