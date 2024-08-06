import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import vaultsList from "@/constants/vaults";
import type { VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";

const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
const nativeVaultsList = vaultsList[appBuildEnvironment];
const defaultChainId = getDefaultChainId(undefined);

const defaultVault =
  nativeVaultsList[defaultChainId][Object.keys(nativeVaultsList[defaultChainId])[0]];

// Define a type for the slice state
interface VaultSliceState {
  activeVault: VaultType;
}

// Define the initial state using that type
const initialState: VaultSliceState = {
  activeVault: defaultVault,
};

export const vaultSlice = createSlice({
  name: "vault",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveVault: (state, action: PayloadAction<VaultType>) => {
      state.activeVault = action.payload;
    },
  },
});

export const { setActiveVault } = vaultSlice.actions;

export default vaultSlice.reducer;
