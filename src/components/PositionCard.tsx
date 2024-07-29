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
  liquidationPrice: string;
  withdrawAction: () => Promise<void>;
  repayAction: () => Promise<void>;
}
const PositionCard: React.FC<PositionCardProps> = ({
  icon,
  symbol,
  tokenName,
  collateral,
  mintedValue,
  collateralRatio,
  liquidationPrice,
  withdrawAction,
  repayAction,
}) => {
  return (
    <div className="flex-1 rounded-3xl p-8 bg-secondaryColor">
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
        <div className="flex gap-2 justify-between items-center">
          <p>Liquidation Price</p>
          <p className="text-[#FF5710]">{liquidationPrice}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <ButtonStyle2 text="Withdraw" action={withdrawAction} disabled={false} />
        <ButtonStyle1 text="Repay" action={repayAction} disabled={true} />
      </div>
    </div>
  );
};

export default PositionCard;
