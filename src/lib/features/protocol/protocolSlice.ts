import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProtocolState {
  protocol: {
    isPaused: boolean;
  };
  trove: {
    isVMPaused: boolean;
    isSunSetting: boolean;
  };
}

// Define the initial state using that type
const initialState = {
  protocol: {
    isPaused: false,
  },
  trove: {
    isVMPaused: false,
    isSunSetting: false,
  },
};

export const protocolSlice = createSlice({
  name: "protocol",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProtocol: (state, action: PayloadAction<ProtocolState>) => {
      state = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.protocol.isPaused = action.payload;
    },
    setIsVmPaused: (state, action: PayloadAction<boolean>) => {
      state.trove.isVMPaused = action.payload;
    },
    setIsSunSetting: (state, action: PayloadAction<boolean>) => {
      state.trove.isSunSetting = action.payload;
    },
  },
});

export const { setProtocol, setIsPaused, setIsVmPaused, setIsSunSetting } = protocolSlice.actions;

export default protocolSlice.reducer;
