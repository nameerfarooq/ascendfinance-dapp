"use client";
import { Oval } from 'react-loader-spinner'
interface ButtonStyle1Props {
  text: string;
  action: () => void;
  disabled: boolean;
  btnLoading: boolean
}
const ButtonStyle1: React.FC<ButtonStyle1Props> = ({ text, action, disabled=false, btnLoading = false }) => {
  return (
    <div
      onClick={async () => {
        if (!disabled) {
          action();
        }
      }}
      className={`w-full rounded-2xl bg-primaryColor py-3 px-8 flex items-center justify-center text-white font-bold text-[14px] leading-[28px] smooth-transition cursor-pointer hover:brightness-110 ${disabled && "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:brightness-100"}`}
      aria-disabled={disabled}
    >
      {btnLoading ? <Oval
        visible={true}
        height="30"
        width="30"
        color="#243048"
        strokeWidth='6'
        secondaryColor="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> : text}
    </div>
  );
};

export default ButtonStyle1;
