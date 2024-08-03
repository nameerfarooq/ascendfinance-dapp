import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import vaultsList from "@/constants/vaults";
import type { Token } from "@/types";

const defaultVault = vaultsList[Object.keys(vaultsList)[0]];

// Define a type for the slice state
export interface VaultState {
  activeVault: { token: Token };
}

// Define the initial state using that type
const initialState: VaultState = {
  activeVault: defaultVault,
};

export const vaultSlice = createSlice({
  name: "vault",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveVault: (state, action: PayloadAction<{ token: Token }>) => {
      state.activeVault = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { setActiveVault } = vaultSlice.actions;

export default vaultSlice.reducer;
