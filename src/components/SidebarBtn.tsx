import React from "react";

import Image from "next/image";
import Link from "next/link";

interface SidebarBtnProps {
  icon: string;
  text: string;
  link: string;
}

const SidebarBtn: React.FC<SidebarBtnProps> = ({ icon, text, link }) => {
  return (
    <Link href={link}>
      <div className="smooth-transition flex gap-6 items-center py-3 pl-24 pr-3 group hover:cursor-pointer hover:bg-primaryColor">
        <Image
          src={icon}
          alt="mint icon"
          className="group-hover:filter group-hover:invert  group-hover:brightness-0"
        />
        <span className="text-1 group-hover:text-white">{text}</span>
      </div>
    </Link>
  );
};

export default SidebarBtn;
