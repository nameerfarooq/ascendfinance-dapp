"use client";

import React, { useEffect, useState, type ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import type { Address } from "viem";
import { useAccount } from "wagmi";

import "@/styles/globals.scss";
import Sidebar from "@/components/Sidebar";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import useAscendCore from "@/hooks/useAscendCore";
import useTroveManager from "@/hooks/useTroveManager";
import { setIsPaused, setIsSunSetting, setIsVmPaused } from "@/lib/features/protocol/protocolSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getDefaultChainId } from "@/utils/chain";

import ascendLogo from "../../public/img/ascendLogo.svg";

interface CustomLayoutProps {
  children: ReactNode;
}
const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  const activeVault = useAppSelector((state) => state.vault.activeVault);

  const { isConnected, chain, address } = useAccount();
  const { paused } = useAscendCore();
  const { vmPaused, sunsetting } = useTroveManager();
  const dispatch = useAppDispatch();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const defaultChainId = getDefaultChainId(chain);

  const [showSideBar, setShowSideBar] = useState(true);

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    if (isConnected && chain && address && activeVault) {
      const ascendCoreAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId || chain?.id].ASCEND_CORE;
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[
          activeVault.token.address as Address
        ].TROVE_MANAGER;

      paused(ascendCoreAddress).then((result) => {
        dispatch(setIsPaused(!!result));
      });

      vmPaused(troveManagerAddress).then((result) => {
        dispatch(setIsVmPaused(!!result));
      });

      sunsetting(troveManagerAddress).then((result) => {
        dispatch(setIsSunSetting(!!result));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setShowSideBar(true);
      } else {
        setShowSideBar(false);
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
    <div className="h-screen flex text-white">
      <div
        className={`${showSideBar ? "w-[15%] min-w-[200px]" : "min-w-[0px]"}  fixed top-0 left-0  xl:static hidden xl:block shadow-2xl z-50`}
      >
        <Sidebar showSideBar={showSideBar} handleShowSideBar={handleShowSideBar} />
      </div>

      {showSideBar && (
        <div className="block xl:hidden fixed top-0 left-0 bg-black bg-opacity-80 w-full h-screen z-[50]">
          <div
            className={`${showSideBar ? "w-[15%] min-w-[200px]" : "min-w-[0px]"}  fixed top-0 left-0  xl:static shadow-2xl z-50`}
          >
            <Sidebar showSideBar={showSideBar} handleShowSideBar={handleShowSideBar} />
          </div>
        </div>
      )}

      <div className="w-[100%] dashboard-background">
        <div className="justify-between xl:justify-end  w-full h-[70px] sticky xl:fixed top-0 left-0  bg-baseColor xl:bg-transparent shadow-2xl xl:shadow-none py-5 px-10 walletConnectBtn flex gap-12 items-center z-40">
          <div className="  xl:hidden flex-1 flex items-center gap-3">
            <div
              onClick={handleShowSideBar}
              className="cursor-pointer p-3 rounded-lg bg-secondaryColor"
            >
              <GiHamburgerMenu size={28} />
            </div>
          </div>

          <div className="hidden sm:flex xl:hidden flex-1  items-center justify-center">
            <Image src={ascendLogo} alt="Ascend Logo" width={55} />
          </div>

          <div className="flex-1 flex justify-end">
            <ConnectButton />
          </div>
        </div>

        <div className="overflow-y-scroll h-[calc(100vh-70px)] xl:h-screen pb-12 xl:pt-[70px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;
