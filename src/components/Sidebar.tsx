import React, { useEffect, useState, type ReactEventHandler } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

import HorizontalLine from "./HorizontalLine";
import SidebarBtn from "./SidebarBtn";
import earnIcon from "../../public/icons/earnIcon.svg";
import mintIcon from "../../public/icons/mintIcon.svg";
import positionsIcon from "../../public/icons/positionsIcon.svg";
import redeemIcon from "../../public/icons/redeemIcon.svg";
import vaultsIcon from "../../public/icons/vaultsIcon.svg";
import logo from "../../public/img/ascendLogo.svg";
interface SidebarProps {
  showSideBar: boolean;
  handleShowSideBar: ReactEventHandler;
}
const Sidebar: React.FC<SidebarProps> = ({ showSideBar, handleShowSideBar }) => {
  const [showIcon, setshowIcon] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setshowIcon(false);
      } else {
        setshowIcon(true);
      }
    };

    // Set the initial state based on the window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-baseColor py-12 flex flex-col relative gap-24 sm:justify-between w-full h-screen">
      {showIcon && showSideBar && (
        <div
          onClick={handleShowSideBar}
          className="absolute top-[20px] -right-[65px] cursor-pointer m-5 p-2 rounded-md bg-baseColor shadow-2xl"
        >
          <IoCloseSharp size={28} />
        </div>
      )}

      {showSideBar && (
        <>
          <div className="flex flex-col gap-28">
            <div className="flex flex-col gap-12 w-full items-center">
              <div>
                <Image src={logo} alt="Ascend logo" width={60} />
              </div>
              <div className="w-full">
                <HorizontalLine />
              </div>
            </div>
            <div
              onClick={(e) => {
                if (showIcon) {
                  handleShowSideBar(e);
                }
              }}
            >
              <SidebarBtn icon={vaultsIcon} text="vaults" link="/" />
              <SidebarBtn icon={mintIcon} text="mint" link="/mint" />
              <SidebarBtn icon={positionsIcon} text="positions" link="/positions" />
              <SidebarBtn icon={redeemIcon} text="redeem" link="/redeem" />
              <SidebarBtn icon={earnIcon} text="earn" link="/earn" />
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
