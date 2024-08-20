export const getEllipsisTxt = (str: `0x${string}`, n: number = 6): string => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const formatDecimals = (num: number, decimals: number) => {
  return num.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
};
