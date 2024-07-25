"use client";
import { useDispatch } from "react-redux";

import { setLoader } from "./lib/features/loaderSlice";

const MintPage = () => {
  const dispatch = useDispatch();
  const setLoaderTrue = () => {
    dispatch(
      setLoader({
        loading: true,
        text1: "Minting",
        text2: "123123 Blue",
      }),
    );
  };
  setLoaderTrue();
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae natus beatae harum a porro amet
      nihil consequuntur sint. Saepe explicabo ullam eos eveniet illum eligendi quos accusamus
      sequi, rem provident.
    </div>
  );
};

export default MintPage;
