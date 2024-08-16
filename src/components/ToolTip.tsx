"use client";
import React, { useState } from "react";

import { CgInfo } from "react-icons/cg";

interface ToolTipProps {
  text: string;
}
const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  const [showToolTip, setshowToolTip] = useState(false);
  return (
    <span className="relative cursor-pointer">
      <span onMouseEnter={() => setshowToolTip(true)} onMouseLeave={() => setshowToolTip(false)}>
        <CgInfo size={22} />
      </span>
      {showToolTip && (
        <span className="absolute top-[30px] left-[10px] w-[250px] p-5 rounded-2xl text-white font-medium text-[12px] leading-[24px] bg-[#304754]">
          {text}
        </span>
      )}
    </span>
  );
};

export default ToolTip;
