"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarBtnProps {
  icon: string;
  text: string;
  link: string;
}

const SidebarBtn: React.FC<SidebarBtnProps> = ({ icon, text, link }) => {
  const pathname = usePathname().split("/")[1];
  const [isActive, setisActive] = useState(false);
  useEffect(() => {
    if (pathname === text) {
      setisActive(true);
    } else if (text === "vaults" && pathname === "") {
      setisActive(true);
    } else {
      setisActive(false);
    }
  }, [pathname, text]);
  return (
    <Link href={link}>
      <div
        className={`${isActive && "active bg-primaryColor"} smooth-transition flex gap-6 items-center py-3 pl-[25%] pr-3 group hover:cursor-pointer hover:bg-primaryColor`}
      >
        <Image
          src={icon}
          alt={`${text} icon`}
          className={`group-hover:filter group-hover:invert group-hover:brightness-0 ${
            isActive ? "filter invert brightness-0" : ""
          }`}
        />
        <span className={`${isActive && "text-white"} text-lightGray text-1 group-hover:text-white `}>{text}</span>
      </div>
    </Link>
  );
};

export default SidebarBtn;
