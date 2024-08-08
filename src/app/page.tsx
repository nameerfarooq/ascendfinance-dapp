"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import VaultCard from "@/components/VaultCard";
import vaultsList from "@/constants/vaults";
import { setActiveVault } from "@/lib/features/vault/vaultSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";

import vaultsIcon from "../../public/icons/vaultsIcon.svg";

const VaultsPage = () => {
  const router = useRouter();
  const { chain } = useAccount();
  const dispatch = useAppDispatch();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const nativeVaultsList = vaultsList[appBuildEnvironment];

  const defaultChainId = getDefaultChainId(chain);

  const setActiveVaultFunc = (vault: VaultType) => {
    dispatch(setActiveVault(vault));
    router.push("/mint");
  };

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-[70px]">
      <div className="px-5 flex gap-6 items-center">
        <Image className="brightness-0 invert" src={vaultsIcon} alt="Vaults Icon" width={24} />
        <p className="leading-[60px] font-bold text-[30px] text-whtie">Vaults</p>
      </div>

      <p className="px-5 text-[14px] text-white font-normal">
        Info about vaults and available LSTs etc. More coming in the future.
      </p>

      <hr className="border-[#647594] w-full my-12" />

      <div className="grid gap-12 grid-cols-1 sm:grid-cols-2">
        {Object.keys(nativeVaultsList[defaultChainId]).map((vaultId) => (
          <VaultCard
            key={vaultId}
            iconImg={nativeVaultsList[defaultChainId][vaultId].token.logoURI}
            symbol={nativeVaultsList[defaultChainId][vaultId].token.symbol}
            name={nativeVaultsList[defaultChainId][vaultId].token.name}
            tvl="$328.34k"
            mintedBlue="299.99k/20.00m"
            minCollateralRation="130%"
            apr="5.99% - 8.99%"
            btnText="Choose weETH"
            learnMoreLink={"/"}
            infoSymbol={nativeVaultsList[defaultChainId][vaultId].name}
            btnAction={() => setActiveVaultFunc(nativeVaultsList[defaultChainId][vaultId])}
          />
        ))}
      </div>
    </div>
  );
};

export default VaultsPage;
