import { configureStore } from "@reduxjs/toolkit";

import loaderSlice from "@/lib/features/loader/loaderSlice";
import protocolSlice from "@/lib/features/protocol/protocolSlice";
import vaultSlice from "@/lib/features/vault/vaultSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loader: loaderSlice,
      vault: vaultSlice,
      protocol: protocolSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
