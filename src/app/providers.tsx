"use client";
import { type ReactNode, useState, useEffect } from "react";
import { useRef } from "react";


import { CacheProvider } from "@chakra-ui/next-js";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/wagmi";

import { makeStore, type AppStore } from "./lib/store";

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const queryClient = new QueryClient();

  const theme = extendTheme({ initialColorMode: "dark", useSystemColorMode: false });

  const appInfo = {
    appName: "Next-Web3-Boilerplate",
  };
  function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
  }
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider resetCSS theme={theme}>
            <RainbowKitProvider coolMode appInfo={appInfo}>
              <StoreProvider>{mounted && children}</StoreProvider>
            </RainbowKitProvider>
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
