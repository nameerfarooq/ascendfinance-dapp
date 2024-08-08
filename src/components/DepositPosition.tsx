'use client'
import React, { useState } from 'react'

import ButtonStyle1 from './Buttons/ButtonStyle1'
import ToolTip from './ToolTip'

const DepositPosition = () => {
    const [zap, setZap] = useState(0)
    const [inputValue, setInputValue] = useState("")

    const makeDeposit = () => {

    }
    const setInputValueMax = () => {
        setInputValue("0")
    }
    return (
        <div className="flex flex-col gap-12 pt-12">
            <div className='flex flex-col gap-2'>
                <div className="flex justify-between items-center">
                    <p className='font-medium text-[12px] leading-[24px]'>Deposit weETH</p>
                    <div className="flex w-6/12 gap-4 items-center">
                        <p className="font-medium text-[12px] leading-[24px] flex gap-3 items-center">Zap <ToolTip text='Tooltip text goes here with additional information about the item.' /> </p>
                        <div className="rounded-2xl bg-secondaryColor flex items-center w-full">
                            <div
                                onClick={() => setZap(0)}
                                className={`${zap == 0 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                            >
                                Off
                            </div>

                            <div
                                onClick={() => setZap(1)}
                                className={`${zap == 1 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                            >
                                ETH
                            </div>

                            <div
                                onClick={() => setZap(2)}
                                className={`${zap == 2 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                            >
                                wETH
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                    <input
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value) }}
                        type="number"
                        placeholder="1.000"
                        className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                    />
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                        <button onClick={setInputValueMax} className="font-bold">Max</button>
                    </div>
                </div>
            </div>

            <div className="text-[12px] text-lightGray font-medium leading-[24px]">
                <div className={`${zap > 0 ? "h-[60px] opacity-100" : "opacity-0 h-0 overflow-hidden"} smooth-transition`}>
                    <div className="flex items-center justify-between gap-3">
                        <p>Exchange rate</p>
                        <p>(1,16495) 1.00 ETH to 0.85 weETH</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <p>Actual deposit</p>
                        <p> <span className='font-bold text-white'> 0.85 weETH </span>= $3 929.00  </p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <p>Collateral ratio change</p>
                    <p className='text-primaryColor'>129% -{'>'} 240%</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <p>Placeholder information</p>
                    <p>Add more as needed</p>
                </div>
            </div>
            <div>
                <ButtonStyle1 disabled={false} action={async () => { makeDeposit() }} text='Deposit' />
            </div>
        </div>
    )
}

export default DepositPosition
