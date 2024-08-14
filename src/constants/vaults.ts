import ezETH_Logo from "@/images/tokens/ezETH.svg";
import weETH_Logo from "@/images/tokens/weETH.svg";
import type { VaultsListType } from "@/types";

const vaultsList: VaultsListType = {
  DEV: {
    11155111: {
      "0xF0F058e935a2a43F72840F8146FE505D8E0d782D": {
        name: "Ether.fi",
        token: {
          address: "0xF0F058e935a2a43F72840F8146FE505D8E0d782D",
          chainId: 11155111,
          name: "EtherFi Restaked Ether",
          symbol: "weETH",
          decimals: 18,
          logoURI: weETH_Logo,
        },
      },
    },
  },
  PROD: {
    1: {
      "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee": {
        name: "Ether.fi",
        token: {
          address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
          chainId: 1,
          name: "EtherFi Restaked Ether",
          symbol: "weETH",
          decimals: 18,
          logoURI: weETH_Logo,
        },
      },
      "0xbf5495efe5db9ce00f80364c8b423567e58d2110": {
        name: "Renzo",
        token: {
          address: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
          chainId: 1,
          name: "Renzo Restaked ETH",
          symbol: "ezETH",
          decimals: 18,
          logoURI: ezETH_Logo,
        },
      },
    },
  },
};

export default vaultsList;
