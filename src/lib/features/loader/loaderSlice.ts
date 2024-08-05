import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LoaderSliceState {
  loading: boolean;
  text1: string;
  text2: string;
}

// Define the initial state using that type
const initialState: LoaderSliceState = {
  loading: false,
  text1: "",
  text2: "",
};

export const loaderSlice = createSlice({
  name: "loader",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
     // Use the PayloadAction type to declare the contents of `action.payload`
    setLoader: (state, action: PayloadAction<LoaderSliceState>) => {
      const { loading, text1, text2 } = action.payload;
      console.log(loading, text1, text2);
      state.loading = loading;
      state.text1 = text1;
      state.text2 = text2;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
