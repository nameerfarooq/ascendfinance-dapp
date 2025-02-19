import React from "react";

import Image from "next/image";
import Link from "next/link";
import { CgInfo } from "react-icons/cg";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";

interface VaultCardProps {
  iconImg: string;
  symbol: string;
  name: string;
  tvl: string;
  mintedBlue: string;
  minCollateralRation: string;
  apr: string;
  btnText: string;
  learnMoreLink: string;
  infoSymbol: string;
  btnDisable?: boolean;

  btnAction: () => void;
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
  learnMoreLink,
  infoSymbol,
  btnDisable = false,
  btnAction,
}) => {
  return (
    <div className="bg-baseColor rounded-[20px] vault-card">
      <div className="py-8 px-8 2xl:px-12 flex gap-6 items-center">
        <Image src={iconImg} alt="icon" width={55} />
        <div className="flex flex-col gap-0">
          <p className="font-bold text-[24px] leading-[28px]">{symbol}</p>
          <p className="font-medium text-[12px] leading-[24px]">{name}</p>
        </div>
      </div>

      <hr className=" border-[#647594]" />

      <div className="flex flex-col gap-8 my-12">
        <div className=" px-8 2xl:px-12 text-lightGray">
          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Total value locked</p>
            <p className="font-bold text-[12px] leading-[24px]">{tvl}</p>
          </div>

          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Minted GREEN</p>
            <p className="font-bold text-[12px] leading-[24px]">{mintedBlue}</p>
          </div>

          <div className="flex justify-between items-center gap-3">
            <p className="font-medium text-[12px] leading-[24px]">Minimum collateral ratio</p>
            <p className="font-bold text-[12px] leading-[24px]">{minCollateralRation}</p>
          </div>
        </div>

        <p className="text-center font-medium text-[16px] leading-[32px] bg-lightGray">
          APR <span className="font-bold"> {apr}</span>
        </p>

        <div className="px-12 2xl:px-24 flex items-center gap-4">
          <CgInfo size={40} />
          <p className="font-medium text-[12px] leading-[15px]">
            Earn 2x <span className="font-bold">{infoSymbol}</span> points on collateral supplied.{" "}
            <Link href={learnMoreLink}>
              <span className="font-bold">Learn More</span>
            </Link>
          </p>
        </div>

        <div className="px-12">
          <ButtonStyle1 text={btnText} action={btnAction} disabled={btnDisable} />
        </div>
      </div>
    </div>
  );
};

export default VaultCard;
