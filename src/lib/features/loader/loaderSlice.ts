import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface LoaderSliceState {
  condition: "hidden" | "loading" | "success" | "failed";
  text1: string;
  text2: string;
}

const initialState: LoaderSliceState = {
  condition: "hidden", // hidden, loading, success, failed
  text1: "",
  text2: "",
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<LoaderSliceState>) => {
      const { condition, text1, text2 } = action.payload;
      console.log("inner condition",condition)
      state.condition = condition;
      state.text1 = text1;
      state.text2 = text2;
    },
  },
  // Removed `extraReducers` since it was incorrect
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
