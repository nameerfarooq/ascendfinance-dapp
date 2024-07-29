"use client";

interface ButtonStyle2Props {
  text: string;
  action: () => Promise<void>;
  disabled: boolean;
}

const ButtonStyle2: React.FC<ButtonStyle2Props> = ({ text, action, disabled }) => {
  return (
    <div
      onClick={async () => {
        if (!disabled) {
          await action();
        }
      }}
      className={`w-full rounded-2xl bg-transparent border-2 border-primaryColor py-3 px-8 flex items-center justify-center text-primaryColor font-bold text-[14px] leading-[28px] smooth-transition cursor-pointer hover:bg-primaryColor hover:text-white ${
        disabled ? "opacity-50 cursor-not-allowed hover:brightness-100" : ""
      }`}
      aria-disabled={disabled}
    >
      {text}
    </div>
  );
};

export default ButtonStyle2;
