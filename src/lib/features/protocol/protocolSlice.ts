import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProtocolState {
  isRecoveryMode: boolean;
  isPaused: boolean;
}

interface TroveState {
  isVMPaused: boolean;
  isSunSetting: boolean;
  maxSystemDebt: string;
  defaultedDebt: string;
  totalActiveDebt: string;
  MCR_value: string;
}

interface BorrowOpState {
  minNetDebt: string;
  CCR_value: string;
  TCR_value: string;
  globalSystemBalances: {
    totalPricedCollateral: string;
    totalDebt: string;
  };
}

interface ProtocolSliceState {
  latestBlockNumber: string;
  protocol: ProtocolState;
  trove: TroveState;
  borrowerOp: BorrowOpState;
}

// Define the initial state using that type
const initialState: ProtocolSliceState = {
  latestBlockNumber: "0",
  protocol: {
    isRecoveryMode: false,
    isPaused: false,
  },
  trove: {
    isVMPaused: false,
    isSunSetting: false,
    maxSystemDebt: "0",
    defaultedDebt: "0",
    totalActiveDebt: "0",
    MCR_value: "0",
  },
  borrowerOp: {
    minNetDebt: "0",
    CCR_value: "0",
    TCR_value: "0",
    globalSystemBalances: {
      totalPricedCollateral: "0",
      totalDebt: "0",
    },
  },
};

export const protocolSlice = createSlice({
  name: "protocol",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`

    // Latest Block Number
    setLatestBlockNumber: (state, action: PayloadAction<string>) => {
      state.latestBlockNumber = action.payload;
    },

    // Protocol Related
    setIsRecoveryMode: (state, action: PayloadAction<boolean>) => {
      state.protocol.isRecoveryMode = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.protocol.isPaused = action.payload;
    },

    // Trove Manager Related
    setIsVmPaused: (state, action: PayloadAction<boolean>) => {
      state.trove.isVMPaused = action.payload;
    },
    setIsSunSetting: (state, action: PayloadAction<boolean>) => {
      state.trove.isSunSetting = action.payload;
    },
    setMaxSystemDebt: (state, action: PayloadAction<string>) => {
      state.trove.maxSystemDebt = action.payload;
    },
    setDefaultedDebt: (state, action: PayloadAction<string>) => {
      state.trove.defaultedDebt = action.payload;
    },
    setTotalActiveDebt: (state, action: PayloadAction<string>) => {
      state.trove.totalActiveDebt = action.payload;
    },
    setMCR: (state, action: PayloadAction<string>) => {
      state.trove.MCR_value = action.payload;
    },

    // Borrower Operations Related
    setMinNetDebt: (state, action: PayloadAction<string>) => {
      state.borrowerOp.minNetDebt = action.payload;
    },
    setCCR: (state, action: PayloadAction<string>) => {
      state.borrowerOp.CCR_value = action.payload;
    },
    setTCR: (state, action: PayloadAction<string>) => {
      state.borrowerOp.TCR_value = action.payload;
    },
    setGlobalSystemBalances: (
      state,
      action: PayloadAction<{
        totalPricedCollateral: string;
        totalDebt: string;
      }>,
    ) => {
      state.borrowerOp.globalSystemBalances = action.payload;
    },
  },
});

export const {
  // Latest Block
  setLatestBlockNumber,
  // Protocol Related
  setIsRecoveryMode,
  setIsPaused,
  // Trove Manager Related
  setIsVmPaused,
  setIsSunSetting,
  setMaxSystemDebt,
  setDefaultedDebt,
  setTotalActiveDebt,
  setMCR,
  // Borrower Operations Related
  setMinNetDebt,
  setCCR,
  setTCR,
  setGlobalSystemBalances,
} = protocolSlice.actions;

export default protocolSlice.reducer;
