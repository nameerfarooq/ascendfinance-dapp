import ezETH_Logo from "@/images/tokens/ezETH.svg";
import weETH_Logo from "@/images/tokens/weETH.svg";

// This is dummy vault till we get the contracts deployed
const vaultsList = {
  "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee": {
    token: {
      address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
      chainId: 1,
      name: "Wrapped eETH",
      symbol: "weETH",
      decimals: 18,
      logoURI: weETH_Logo,
    },
  },
  "0xbf5495efe5db9ce00f80364c8b423567e58d2110": {
    token: {
      address: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
      chainId: 1,
      name: "Renzo Restaked ETH",
      symbol: "ezETH",
      decimals: 18,
      logoURI: ezETH_Logo,
    },
  },
};

export default vaultsList;
