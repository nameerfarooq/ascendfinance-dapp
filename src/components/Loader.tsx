"use client";

import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { setLoader } from "@/app/lib/features/loaderSlice";

import spinner from "../../public/icons/spinner.png";
import ascendLogo from "../../public/img/ascendLogo.svg";

const Loader = () => {
  const { loading, text1, text2 } = useSelector((state: any) => state.loader);
  const dispatch = useDispatch();
  const clearLoader = () => {
    dispatch(
      setLoader({
        loading: false,
        text1: "",
        text2: "",
      }),
    );
  };
  return (
    <>
      {loading && (
        <div className="absolute z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative rounded-3xl flex shadowCustom flex-col gap-4 py-12 px-12 bg-baseColor min-w-[150px]">
            <div onClick={clearLoader} className="absolute top-8 right-5 cursor-pointer">
              <RxCross2 size={16} color="white" />
            </div>

            <>
              <div className="relative flex items-center justify-center w-[200px] h-[200px]">
                <div>
                  <Image quality={100} src={ascendLogo} alt="Ascend icon" width={70} height={70} />
                </div>

                <div className="absolute">
                  <Image
                    className="spinner-icon-animate"
                    quality={100}
                    src={spinner}
                    alt="spinner icon"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </>

            <p className="text-center text-[18px] font-bold text-white">{text1}</p>
            <p className="text-center text-[18px] font-bold text-primaryColor">{text2}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
