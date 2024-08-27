import { type ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "@/styles/globals.scss";
import { Providers } from "@/app/providers";
import GlobalStateSetting from "@/components/GlobalStateSetting/page";
import Loader from "@/components/Loader";

import CustomLayout from "./CustomLayout";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ascend Finance",
  applicationName: "ascendfinance-frontend",
  description:
    "Base-native, Interest-bearing stablecoin. Earn real yield by holding $GREEN, the Base-native stablecoin which is overcollateralized by Liquid Staking Tokens.",
  icons: "favicon.ico",
  manifest: "site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <CustomLayout>
            <GlobalStateSetting>{children}</GlobalStateSetting>
          </CustomLayout>
          <Loader />
        </Providers>
      </body>
    </html>
  );
}
