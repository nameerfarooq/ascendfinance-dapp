import React from "react";

import Image from "next/image";

import ButtonStyle1 from "./Buttons/ButtonStyle1";
import ButtonStyle2 from "./Buttons/ButtonStyle2";
interface PositionCardProps {
  icon: string;
  symbol: string;
  tokenName: string;
  collateral: string;
  mintedValue: string;
  collateralRatio: string;
  ManageAction: () => Promise<void>;
}
const PositionCard: React.FC<PositionCardProps> = ({
  icon,
  symbol,
  tokenName,
  collateral,
  mintedValue,
  collateralRatio,
  ManageAction,
}) => {
  return (
    <>
      <div className="flex-1 rounded-3xl p-8 bg-secondaryColor sm:hidden">
        <div className="flex items-center gap-4">
          <Image alt="Coin symbol" src={icon} width={50} />
          <div className="flex flex-col">
            <p className="font-bold text-[24px]">{symbol}</p>
            <p className="font-medium text-[12px]">{tokenName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-12 text-[12px] text-lightGray font-medium">
          <div className="flex gap-2 justify-between items-center text-white">
            <p className="font-medium">Collateral</p>
            <p className="font-bold">{collateral}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <p>Minted</p>
            <p>{mintedValue}</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <p>Collateral Ratio</p>
            <p className="text-primaryColor">{collateralRatio}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <ButtonStyle1 text="Manage >" action={ManageAction} disabled={false} />
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-around gap-4 bg-secondaryColor py-6 px-6 lg:px-12 rounded-2xl">
        <div className="flex items-center gap-4 flex-[2]">
          <Image alt="Coin symbol" src={icon} width={50} />
          <div className="flex flex-col">
            <p className="font-bold text-[24px]">{symbol}</p>
            <p className="font-medium text-[12px]">{tokenName}</p>
          </div>
        </div>
        <div className="flex-1 text-center text-[12px] text-lightGray font-bold">{collateral}</div>
        <div className="flex-1 text-center text-[12px] text-lightGray font-bold">{mintedValue}</div>
        <div className="flex-1 text-center text-[12px] text-primaryColor font-medium">
          {collateralRatio}
        </div>
        <div className="flex-1">
          <ButtonStyle1 text="Manage>" action={ManageAction} disabled={false} />
        </div>
      </div>
    </>
  );
};

export default PositionCard;
