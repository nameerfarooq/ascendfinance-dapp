import React from "react";
interface RedeemListItemProps {
  walletAddress: string;
  Cr: string;
  Debt: string;
  NewDebt: string;
}
const RedeemListItem: React.FC<RedeemListItemProps> = ({ walletAddress, Cr, Debt, NewDebt }) => {
  return (
    <div className=" cursor-pointer flex py-6 gap-3 px-4 sm:px-8 bg-secondaryColor rounded-2xl hover:bg-lightGray2 smooth-transition">
      <div className=" flex items-center   font-medium text-white text-[10px] leading-[20px] flex-1">
        {walletAddress}
      </div>
      <div className="flex items-center   font-medium text-[#FF5710] text-[12px] leading-[24px] flex-1">
        {Cr}
      </div>
      <div className="flex items-center font-medium text-white text-[12px] leading-[24px] flex-1">
        {Debt}
      </div>
      <div className="flex items-center  font-medium text-white text-[12px] leading-[24px] flex-1">
        {NewDebt}
      </div>
    </div>
  );
};

export default RedeemListItem;
