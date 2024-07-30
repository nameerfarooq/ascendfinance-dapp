import type React from "react";
import type { ReactEventHandler } from "react";

import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import CollateralItem from "./CollateralItem";
import eth from "../../public/icons/eth.svg";
import reth from "../../public/icons/reth.svg";
import weth from "../../public/icons/weth.svg";
import wsteth from "../../public/icons/wsteth.svg";

interface CollateralTypeCardProps {
  handleShowCollateralCard: ReactEventHandler;
}

const CollateralTypeCard: React.FC<CollateralTypeCardProps> = ({ handleShowCollateralCard }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative shadowCustom rounded-3xl flex flex-col gap-4 px-10 py-8  bg-baseColor w-[460px] min-w-[250px]">
        <div onClick={handleShowCollateralCard} className="absolute top-10 right-10 cursor-pointer">
          <RxCross2 size={22} color="white" />
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-bold text-[24px] leading-[36px]">Collateral type</p>
          <div className="flex rounded-xl items-center gap-8 bg-secondaryColor py-4 px-6">
            <FiSearch size={22} color="white" />
            <input
              type="text"
              placeholder="Search or type in an address"
              className="outline-none border-none placeholder:text-lightGray2 text-white w-full bg-transparent font-medium text-[14px]"
            />
          </div>
          <div className="overflow-y-scroll max-h-[410px]">
            <CollateralItem symbol="ETH" imageSrc={eth} name="Ethereum" balance={200} />
            <CollateralItem symbol="WETH" imageSrc={weth} name="Wrapped Ethereum" balance={4} />
            <CollateralItem
              symbol="wstETH"
              imageSrc={wsteth}
              name="Wrapped liquid staked Ether 2.0"
              balance={20.87}
            />
            <CollateralItem
              symbol="rETH"
              imageSrc={reth}
              name="Rocket Pool Ether"
              balance={99.987}
            />
            <CollateralItem symbol="ETH" imageSrc={eth} name="Ethereum" balance={200} />
            <CollateralItem symbol="WETH" imageSrc={weth} name="Wrapped Ethereum" balance={4} />
            <CollateralItem
              symbol="wstETH"
              imageSrc={wsteth}
              name="Wrapped liquid staked Ether 2.0"
              balance={20.87}
            />
            <CollateralItem
              symbol="rETH"
              imageSrc={reth}
              name="Rocket Pool Ether"
              balance={99.987}
            />
            <CollateralItem symbol="ETH" imageSrc={eth} name="Ethereum" balance={200} />
            <CollateralItem symbol="WETH" imageSrc={weth} name="Wrapped Ethereum" balance={4} />
            <CollateralItem
              symbol="wstETH"
              imageSrc={wsteth}
              name="Wrapped liquid staked Ether 2.0"
              balance={20.87}
            />
            <CollateralItem
              symbol="rETH"
              imageSrc={reth}
              name="Rocket Pool Ether"
              balance={99.987}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollateralTypeCard;
