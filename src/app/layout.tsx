"use client";
import { useEffect, useState, type ReactNode } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
// import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";

import { Providers } from "./providers";

import "@/styles/globals.scss";

import "@rainbow-me/rainbowkit/styles.css";

const manrope = Manrope({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ascend Finance",
//   applicationName: "Ascend Finance",
//   description: "Ascend Finance protocol",
//   authors: {
//     name: "boris",
//     url: "https://github.com/borisascend/ascendfinance-frontend",
//   },
//   icons: "favicon.ico",
//   manifest: "site.webmanifest",
// };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [showSideBar, setShowSideBar] = useState(true);
  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };
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
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <div className="h-screen flex text-white">
            <div className="fixed top-5 right-10 walletConnectBtn flex gap-12 items-center">
              <div onClick={handleShowSideBar} className="cursor-pointer block xl:hidden">
                {showSideBar ? <IoCloseSharp size={28} /> : <GiHamburgerMenu size={28} />}
              </div>
              <ConnectButton />
            </div>

            <div
              className={`${showSideBar ? "w-[15%] min-w-[200px]" : "min-w-[0px]"}  fixed top-0 left-0  xl:static shadow-2xl`}
            >
              <Sidebar showSideBar={showSideBar} handleShowSideBar={handleShowSideBar} />
            </div>

            <div className="w-[100%] dashboard-background">{children}</div>
          </div>
          <Loader />
        </Providers>
      </body>
    </html>
  );
}
