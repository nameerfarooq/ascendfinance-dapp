import type { ReactNode } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import Sidebar from "@/components/Sidebar";

import { Providers } from "./providers";

import "@/styles/globals.scss";

import "@rainbow-me/rainbowkit/styles.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ascend Finance",
  applicationName: "Ascend Finance",
  description: "Ascend Finance protocol",
  authors: {
    name: "UsamaZuberi",
    url: "https://github.com/UsamaZuberi/Next-Web3-Boilerplate",
  },
  icons: "favicon.ico",
  manifest: "site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <div className="h-screen flex text-white">
            <div className="fixed top-10 right-10 walletConnectBtn">
              <ConnectButton />
            </div>
            <div className="w-[15%]">
              <Sidebar />
            </div>
            <div className="w-[100%]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
