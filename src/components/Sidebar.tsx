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
          <SidebarBtn icon={mintIcon} text="Mint" link="/" />
          <SidebarBtn icon={withdrawIcon} text="Withdraw" link="/" />
          <SidebarBtn icon={repayIcon} text="Repay" link="/" />
          <SidebarBtn icon={redeemIcon} text="Redeem" link="/a" />
        </div>
      </div>
      <div>b</div>
    </div>
  );
};

export default Sidebar;
