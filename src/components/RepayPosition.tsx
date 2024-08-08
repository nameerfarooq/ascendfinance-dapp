'use client'
import React, { useState } from 'react'

import ButtonStyle1 from './Buttons/ButtonStyle1'

const RepayPosition = () => {
    const [inputValue, setInputValue] = useState("")

    const makeRepay = () => {

    }
    const setInputValueMax = () => {
        setInputValue("0")
    }
    return (
        <div className="flex flex-col gap-12 pt-12">
            <div className='flex flex-col gap-2'>
                <p className='font-medium text-[12px] leading-[24px]'>Repay GREEN</p>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                    <input
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value) }}
                        type="number"
                        placeholder="100 GREEN"
                        className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                    />
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                        <button onClick={setInputValueMax} className="font-bold">Max</button>
                    </div>
                </div>
            </div>

            <div className="text-[12px] text-lightGray font-medium leading-[24px]">

                <div className="flex items-center justify-between gap-3">
                    <p>Collateral ratio change</p>
                    <p className='text-primaryColor'>129% -{'>'} 140%</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <p>Placeholder information</p>
                    <p>Add more as needed</p>
                </div>
            </div>
            <div>
                <ButtonStyle1 disabled={false} action={async () => { makeRepay() }} text='Repay' />
            </div>
        </div>
    )
}

export default RepayPosition
