import Image from "next/image";

import HorizontalLine from "./HorizontalLine";
import SidebarBtn from "./SidebarBtn";
import mintIcon from "../../public/icons/mintIcon.svg";
import redeemIcon from "../../public/icons/redeemIcon.svg";
import repayIcon from "../../public/icons/repayIcon.svg";
import withdrawIcon from "../../public/icons/withdrawIcon.svg";
import logo from "../../public/img/ascendLogo.svg";
const Sidebar = () => {
  return (
    <div className="bg-baseColor py-8 flex flex-col justify-between w-full h-screen">
      <div className="flex flex-col gap-28">
        <div className="flex flex-col gap-8 w-full items-center">
          <div>
            <Image src={logo} alt="Ascend logo" width={53} height={45} />
          </div>
          <div className="w-full">
            <HorizontalLine />
          </div>
        </div>
        <div>
          <SidebarBtn icon={mintIcon} text="mint" link="/" />
          <SidebarBtn icon={withdrawIcon} text="withdraw" link="/withdraw" />
          <SidebarBtn icon={repayIcon} text="repay" link="/repay" />
          <SidebarBtn icon={redeemIcon} text="redeem" link="/redeem" />
        </div>
      </div>
      <div className="flex flex-col gap-12 w-full items-center pb-8">
        <HorizontalLine />
        <div className="px-2 py-6 w-4/6 flex flex-col gap-4">
          <p className="text-center text-[1.4rem] font-bold leading-7">PROTOCOL STATS</p>

          <div className="flex flex-col gap-0">
            <div className="flex justify-between items-center">
              <p className="text-2">Deposits:</p>
              <p className="text-2">$20m</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2">Liquidity:</p>
              <p className="text-2">$13m</p>
            </div>
            <div className="flex justify-between items-center ">
              <p className="text-3">Total TVL:</p>
              <p className="text-3">$33m</p>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
