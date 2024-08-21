/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import Image from "next/image";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";

import linkIcon from "../../../public/icons/link.svg";
import stabilityIcon from "../../../public/icons/mintIcon.svg";

const Page = () => {
    const [tab, setTab] = useState(0);
    const [isDepositValid, setisDepositValid] = useState(true);
    const [depositAmount, setdepositAmount] = useState("0");
    const [depositerror, setDepositerror] = useState("");
    const setDepositToMax = () => { };
    return (
        <div className="flex items-center justify-center min-h-full w-full">
            <div className="bg-baseColor shadowCustom rounded-3xl w-[90%] mt-[50px] md:mt-[10px]  lg:w-[70%]  xl:w-[68%] 2xl:w-[55%] ">
                <div className="py-6 px-4 sm:px-12">
                    <div className="flex items-center gap-4">
                        <Image
                            alt="Stability icon"
                            src={stabilityIcon}
                            width={30}
                            className="brightness-0 invert"
                        />
                        <p className="font-bold leading-[26px] text-[22px] sm:leading-[48px] sm:text-[24px] text-white">
                            Manage Stability Pool
                        </p>
                    </div>
                    <p className="text-[14px] leading-[24px]">
                        Deposit GREEN to earn ASCEND rewards. During liquidations, your deposit will be used to
                        purchase discounted collaterals.
                    </p>
                    <div className="flex gap-6 md:gap-24 items-center mt-10 flex-col md:flex-row">
                        <div className="flex w-full md:w-6/12 bg-secondaryColor rounded-2xl py-3 px-6 cursor-pointer">
                            <div className="w-full text-center text-[12px] font-medium text-lightGray">
                                GREEN: 0x293..CD39
                            </div>
                            <div className="flex justify-center items-center">
                                <Image alt="Stability icon" src={linkIcon} />
                            </div>
                        </div>
                        <div className="flex w-full md:w-6/12 bg-secondaryColor rounded-2xl py-3 px-6 cursor-pointer">
                            <div className="w-full text-center text-[12px] font-medium text-lightGray">
                                Stability Pool: 0x293..CD39
                            </div>
                            <div className="flex justify-center items-center">
                                <Image alt="Stability icon" src={linkIcon} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-lightGray2 my-2" />
                <div className="py-6 px-4 sm:px-12 flex flex-col-reverse md:flex-row gap-12 md:gap-24 ">
                    <div className="flex-1 flex flex-col gap-10 mt-10 mb-5">
                        <div className="rounded-2xl bg-secondaryColor flex items-center">
                            <div
                                onClick={() => setTab(0)}
                                className={`${tab == 0 && "bg-primaryColor text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-1 text-center flex-1 items-center justify-center`}
                            >
                                Deposit
                            </div>

                            <div
                                onClick={() => setTab(1)}
                                className={`${tab == 1 && "bg-primaryColor text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-1 text-center flex-1 items-center justify-center`}
                            >
                                Withdraw
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-[12px] leading-[24px]">{tab == 0 ? "Deposit" : "Withdraw"} GREEN</p>
                                <p className="font-medium text-[12px] leading-[24px]">Available: <span className="font-bold"> 2000.00</span> GREEN</p>
                            </div>

                            <div
                                className={`${!isDepositValid ? "border-[#FF5710]" : "border-transparent"} border mt-3 rounded-2xl bg-secondaryColor py-3 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
                            >
                                <input
                                    type="number"
                                    placeholder={`1324.00 GREEN`}
                                    value={depositAmount}
                                    onChange={(e) => {
                                        setdepositAmount(e.target.value);
                                    }}
                                    className="bg-transparent placeholder:text-lightGray outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                                />
                                <div className="flex items-center  font-medium  sm:text-[14px] leading-[28px]">
                                    <button type="button" onClick={setDepositToMax} className="font-bold">
                                        Max
                                    </button>
                                </div>
                            </div>

                            {depositerror && <p className="text-[#FF5710] mt-4 text-[12px]">{depositerror}</p>}
                        </div>
                        <div>
                            <ButtonStyle1 text={tab == 0 ? "Deposit" : "Withdraw"} action={async () => { }} disabled={!isDepositValid} />
                        </div>
                    </div>
                    <div className="flex-1 font-medium text-[10px] sm:text-[12px] leading-[24px]">
                        <div className="flex items-center py-3 px-4 sm:px-8">
                            <div className="flex-1 flex items-center">APR</div>
                            <div className="flex-1 flex items-center justify-center">TVL</div>
                            <div className="flex-1 flex items-center justify-end">Your Deposits</div>
                        </div>
                        <div className="flex items-center py-4 px-4 sm:px-8 bg-secondaryColor rounded-2xl">
                            <div className="flex-1 flex items-center text-primaryColor">4.34%</div>
                            <div className="flex-1 flex items-center justify-center">$323,93k</div>
                            <div className="flex-1 flex items-center justify-end">$0.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
