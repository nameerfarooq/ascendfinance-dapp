"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
// import { useRouter } from "next/navigation";
import type { Address } from "viem";
import { useAccount } from "wagmi";

import MintSection from "@/components/MintSection";
import VaultCard from "@/components/VaultCard";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import vaultsList from "@/constants/vaults";
import useTroveManager from "@/hooks/useTroveManager";
import { setActiveVault } from "@/lib/features/vault/vaultSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";

import vaultsIcon from "../../public/icons/vaultsIcon.svg";

const VaultsPage = () => {
  // const router = useRouter();
  const [showMintSection, setShowMintSection] = useState(false)
  const handleShowMintSection = () => {
    setShowMintSection(!showMintSection)
  }
  const { isConnected, address, chain } = useAccount();
  const dispatch = useAppDispatch();
  const { getTroveStatus } = useTroveManager();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const nativeVaultsList = vaultsList[appBuildEnvironment];

  const defaultChainId = getDefaultChainId(chain);

  const [vaultStatusList, setVaultStatusList] = useState<{ [x: string]: bigint }>({});

  const setActiveVaultFunc = (vault: VaultType) => {
    dispatch(setActiveVault(vault));
    handleShowMintSection()
  };



  useEffect(() => {
    if (isConnected && address && chain && chain.id) {
      const vaultIds = Object.keys(nativeVaultsList[chain?.id]);
      let vaultStatusObj = {};

      vaultIds.map(async (vaultId) => {
        const troveManagerAddress: Address =
          CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[vaultId as Address]
            .TROVE_MANAGER;

        await getTroveStatus(troveManagerAddress, address).then((status) => {
          vaultStatusObj = { ...vaultStatusObj, [vaultId]: status };
          setVaultStatusList(vaultStatusObj);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, nativeVaultsList, appBuildEnvironment]);

  return (
    <>
      {
        showMintSection ? <MintSection handleShowMintSection={handleShowMintSection} /> :


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
                  btnText={
                    vaultStatusList[vaultId] === 1n
                      ? "Manage"
                      : `Choose ${nativeVaultsList[defaultChainId][vaultId].token.symbol}`
                  }
                  learnMoreLink={"/"}
                  infoSymbol={nativeVaultsList[defaultChainId][vaultId].name}
                  btnAction={
                    vaultStatusList[vaultId] === 1n
                      ? () => { }
                      : () => setActiveVaultFunc(nativeVaultsList[defaultChainId][vaultId])
                  }
                />
              ))}
            </div>
          </div>
      }
    </>
  );
};

export default VaultsPage;
