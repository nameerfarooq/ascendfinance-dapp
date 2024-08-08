'use client'
import React, { useState } from 'react'

import { CgInfo } from 'react-icons/cg'

interface ToolTipProps {
    text: string
}
const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
    const [showToolTip, setshowToolTip] = useState(false)
    return (
        <div className='relative cursor-pointer'>
            <div onMouseEnter={() => setshowToolTip(true)} onMouseLeave={() => setshowToolTip(false)}>
                <CgInfo size={22} />
            </div>
            {showToolTip && <div className="absolute top-[30px] left-[10px] w-[250px] p-5 rounded-2xl text-white font-medium text-[12px] leading-[24px] bg-[#304754]">
                {text}
            </div>}
        </div>
    )
}

export default ToolTip
