import React, { type ReactEventHandler } from "react";

interface ButtonStyle1Props {
  text: string;
  action: ReactEventHandler;
}
const ButtonStyle1: React.FC<ButtonStyle1Props> = ({ text, action }) => {
  return (
    <div
      onClick={action}
      className="w-full rounded-2xl bg-primaryColor py-4 px-8 flex items-center justify-center text-white font-bold text-[14px] leading-[28px] smooth-transition cursor-pointer hover:brightness-110"
    >
      {text}
    </div>
  );
};

export default ButtonStyle1;
