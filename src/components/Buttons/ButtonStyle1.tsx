"use client";
interface ButtonStyle1Props {
  text: string;
  action: () => Promise<void>;
  disabled: boolean;
}
const ButtonStyle1: React.FC<ButtonStyle1Props> = ({ text, action, disabled }) => {
  return (
    <div
      onClick={async () => {
        if (!disabled) {
          await action(); 
        }
      }}
      className={`w-full rounded-2xl bg-primaryColor py-3 px-8 flex items-center justify-center text-white font-bold text-[14px] leading-[28px] smooth-transition cursor-pointer hover:brightness-110 ${disabled && "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:brightness-100"}`}
      aria-disabled={disabled}
    >
      {text}
    </div>
  );
};

export default ButtonStyle1;
