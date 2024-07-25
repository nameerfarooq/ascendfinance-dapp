"use client";
import { useState } from "react";

import CollateralTypeCard from "@/components/CollateralTypeCard";

const page = () => {
  const [showCollateralCard, setshowCollateralCard] = useState(true);
  const handleShowCollateralCard = ()=>{
    setshowCollateralCard(!showCollateralCard)
  }
  return <div>{showCollateralCard && <CollateralTypeCard handleShowCollateralCard={handleShowCollateralCard}/>}</div>;
};

export default page;
