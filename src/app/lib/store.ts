import { configureStore } from "@reduxjs/toolkit";

import loaderSlice from "./features/loaderSlice";
import vaultSlice from "./features/vaultSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loader: loaderSlice,
      vault: vaultSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
