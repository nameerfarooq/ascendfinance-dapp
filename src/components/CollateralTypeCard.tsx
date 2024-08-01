import type React from "react";
import type { ReactEventHandler } from "react";

import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import CollateralItem from "./CollateralItem";
import ezETHIcon from "../../public/icons/ezETH.svg";
import weETHIcon from "../../public/icons/weETH.svg";

interface CollateralTypeCardProps {
  handleShowCollateralCard: ReactEventHandler;
}

const CollateralTypeCard: React.FC<CollateralTypeCardProps> = ({ handleShowCollateralCard }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex items-center justify-center z-30">
      <div className="relative shadowCustom rounded-3xl flex flex-col gap-4 px-4 sm:px-10 py-8  bg-baseColor w-[90%] sm:w-[460px] min-w-[250px]">
        <div onClick={handleShowCollateralCard} className="absolute top-10 right-10 cursor-pointer">
          <RxCross2 size={22} color="white" />
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-bold text-[24px] leading-[36px]">Available Vaults</p>
          <div className="flex rounded-3xl items-center gap-8 bg-secondaryColor py-4 px-6">
            <FiSearch size={22} color="white" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none border-none placeholder:text-lightGray2 text-white w-full bg-transparent font-medium text-[14px]"
            />
          </div>
          <div className="overflow-y-scroll max-h-[410px]">
            <CollateralItem
              symbol="weETH"
              imageSrc={weETHIcon}
              name="Etherfi Restaked Ether"
              apr="8.99%"
            />
            <CollateralItem
              symbol="ezETH"
              imageSrc={ezETHIcon}
              name="Renzo Restaked Ether"
              apr="5.99%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollateralTypeCard;
