import React from "react";

import Image from "next/image";

interface CollateralItemProps {
  imageSrc: string;
  symbol: string;
  name: string;
  balance: number;
}

const CollateralItem: React.FC<CollateralItemProps> = ({ imageSrc, symbol, name, balance }) => {
  return (
    <div className="flex gap-3 group justify-between items-center cursor-pointer p-3 pr-6 hover:bg-primaryColor smooth-transition rounded-lg">
      <div className="flex items-center gap-4">
        <Image src={imageSrc} alt="Coin icon" width={40} />
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-[21px]">{symbol}</p>
          <p className="text-[12px] text-lightGray2 group-hover:text-white smooth-transition leading-[18px]">
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-[14px] font-semibold leading-[21px] text-white">{balance}</p>
      </div>
    </div>
  );
};

export default CollateralItem;
