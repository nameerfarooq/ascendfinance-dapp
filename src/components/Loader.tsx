"use client";
import { useEffect } from "react";

import Image from "next/image";
import { RiCheckFill } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";

import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


import spinner from "../../public/icons/spinner.png";
import ascendLogo from "../../public/img/ascendLogo.svg";

const Loader = () => {
  const dispatch = useAppDispatch();
  const { condition, text1, text2 } = useAppSelector((state) => state.loader);

  useEffect(() => {
    if (condition === "success" || condition === "failed") {
      const timeout = setTimeout(() => {
        dispatch(setLoader({ condition: "hidden", text1: "", text2: "" }));
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [condition, dispatch]);


  return (
    <>
      {(condition === "loading" || condition === "success" || condition === "failed") && (
        <div className="absolute z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative rounded-3xl flex shadowCustom flex-col gap-4 py-12 px-12 bg-baseColor min-w-[150px]">

            <>
              <div className="relative flex items-center justify-center w-full min-w-[200px] h-[200px]">
                {condition === "success" &&
                  <div className="rounded-full flex items-center justify-center p-5 bg-primaryColor">
                    <RiCheckFill color="white" size={100} />

                  </div>
                }
                {condition === "failed" &&
                  <div className="rounded-full flex items-center justify-center p-5 bg-[#FF5710]">
                    <RiCloseLine
                      color="white" size={100} />
                  </div>
                }
                {condition === "loading" && <>
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
                </>
                }
              </div>
            </>

            <p
              className={`text-center text-[18px] font-bold ${condition === "loading"
                ? "text-white"
                : condition === "success"
                  ? "text-primaryColor"
                  : condition === "failed"
                    ? "text-[#FF5710]"
                    : ""
                }`}
            >
              {text1}
            </p>
            <p className="text-center text-[18px] font-bold text-white">{text2}</p>
          </div>
        </div>
      )}
    </>
  );

};

export default Loader;
