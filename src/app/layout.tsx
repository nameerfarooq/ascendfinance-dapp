import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const open_sans = Open_Sans({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
 
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Providers>
          {children}
       
        </Providers>
      </body>
    </html>
  );
}
