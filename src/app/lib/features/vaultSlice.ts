import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface VaultState {
  activeVault: string;
}

// Define the initial state using that type
const initialState: VaultState = {
  activeVault: ""
};

export const vaultSlice = createSlice({
  name: "vault",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveVault: (state, action: PayloadAction<string>) => {
      state.activeVault = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { setActiveVault } = vaultSlice.actions;

export default vaultSlice.reducer;
