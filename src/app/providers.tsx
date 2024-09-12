"use client";

import { type ReactNode, useState } from "react";

import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState } from "wagmi";

import StoreProvider from "@/app/StoreProvider";
import { wagmiConfig } from "@/wagmi";

type Props = {
  children: ReactNode;
  cookie?: string | null;
};

export function Providers({ children, cookie }: Props) {
  const initialState = cookieToInitialState(wagmiConfig, cookie);
  const [queryClient] = useState(() => new QueryClient());

  const theme = extendTheme({ initialColorMode: "dark", useSystemColorMode: false });

  const appInfo = {
    appName: "ascendfinance-frontend",
    description:
      "Base-native, Interest-bearing stablecoin. Earn real yield by holding $GREEN, the Base-native stablecoin which is overcollateralized by Liquid Staking Tokens.",
  };

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider resetCSS theme={theme}>
            <RainbowKitProvider
              coolMode
              appInfo={appInfo}
              theme={darkTheme({
                accentColor: "#27b769",
                accentColorForeground: "#fff",
                overlayBlur: "large",
              })}
            >
              <StoreProvider>{children}</StoreProvider>
            </RainbowKitProvider>
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
