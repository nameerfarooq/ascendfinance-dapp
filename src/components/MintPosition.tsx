"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import { formatUnits, parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import type { VaultType } from "@/types";

interface MintPositionProps {
  activeVault: VaultType | undefined;
}

const MintPosition: React.FC<MintPositionProps> = ({ activeVault }) => {
  const { isConnected, chain, address } = useAccount();
  const { balanceOf, allowance } = useERC20Contract();
  const { getTroveOwnersCount, getTroveCollSharesAndDebt } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { withdrawDebt } = useBorrowerOperations();

  const [mintAmount, setMintAmount] = useState<string>("0");
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n);
  const [isAllowanceEnough, setIsAllowanceEnough] = useState<boolean>(false);
  const [isMintValid, setIsMintValid] = useState<boolean>(false);

  console.log(isAllowanceEnough);
  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const debouncedMintAmount = useDebounce(mintAmount, 350);

  const fetchTokenbalance = (tokenAddress: Address, walletAddress: Address) => {
    if (address) {
      balanceOf(tokenAddress, walletAddress).then((balance) => {
        setTokenBalance(balance);
      });
    }
  };

  const fetchTokenAllowance = (
    tokenAddress: Address,
    ownerAddress: Address,
    spenderAddress: Address,
  ) => {
    if (address && mintAmount && activeVault) {
      allowance(tokenAddress, ownerAddress, spenderAddress).then((result) => {
        if (result >= parseUnits(mintAmount, activeVault.token.decimals)) {
          setIsAllowanceEnough(true);
        } else {
          setIsAllowanceEnough(false);
        }
      });
    }
  };

  const handleMintInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setMintAmount(value);
  };

  // const getTokenApproved = async (
  //   tokenAddress: Address,
  //   spenderAddress: Address,
  //   amount: bigint,
  // ) => {
  //   if (address && mintAmount) {
  //     await approve(tokenAddress, spenderAddress, amount).then((tx) => {
  //       console.log("Approved: ", tx);
  //       fetchTokenAllowance(tokenAddress, address, spenderAddress);
  //     });
  //   }
  // };

  const setMintToMax = () => {
    if (activeVault) {
      const maxMintAmount = formatUnits(tokenBalance, activeVault.token.decimals);
      setMintAmount(maxMintAmount);
    }
  };

  const getTokenMinted = async (
    troveManagerAddress: Address,
    multiCollateralHintHelpersAddress: Address,
    sortedTrovesAddress: Address,
    borrowerOperationsAddress: Address,
    amount: bigint,
  ) => {
    if (address && activeVault) {
      // Step#1
      const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);
      console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);

      // Step#2
      const totalDebt = troveCollSharesAndDebt[1] + amount;

      // Step#3
      const NCIR = await computeNominalCR(
        multiCollateralHintHelpersAddress,
        troveCollSharesAndDebt[0],
        totalDebt,
      );
      console.log("NCIR: ", NCIR);

      // Step#4
      const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
      console.log("troveOwnersCount: ", troveOwnersCount);

      // Step#5
      const numTrials = Math.ceil(15 * Math.sqrt(Number(troveOwnersCount)));
      const inputRandomSeed = BigInt(Math.ceil(Math.random() * 100000));

      const approxHint = await getApproxHint(
        multiCollateralHintHelpersAddress,
        troveManagerAddress,
        NCIR,
        numTrials.toString(),
        inputRandomSeed,
      );
      console.log("approxHint: ", approxHint);

      // Step#6
      const insertPosition = await findInsertPosition(
        sortedTrovesAddress,
        NCIR,
        approxHint[0],
        approxHint[0],
      );
      console.log("insertPosition: ", insertPosition);

      // Step#7
      const tx = await withdrawDebt(
        borrowerOperationsAddress,
        troveManagerAddress,
        address,
        0n,
        amount,
        insertPosition[0],
        insertPosition[1],
      );
      console.log("tx: ", tx);
    }
  };

  const handleCtaFunctions = () => {
    if (address && chain && activeVault) {
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;
      const multiCollateralHintHelpersAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].MULTI_COLLATERAL_HINT_HELPERS;
      const sortedTrovesAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .SORTED_TROVES;

      getTokenMinted(
        troveManagerAddress,
        multiCollateralHintHelpersAddress,
        sortedTrovesAddress,
        borrowerOperationsAddress,
        parseUnits(mintAmount, 18),
      );
    } else {
      console.log("wallet not connected.");
    }
  };

  const validateMint = () => {
    let isValid = false;
    const amount = parseFloat(mintAmount);
    if (
      activeVault &&
      amount > 0 &&
      amount <= parseFloat(formatUnits(tokenBalance, activeVault.token.decimals))
    ) {
      isValid = true;
    }

    setIsMintValid(isValid);
  };

  useEffect(() => {
    validateMint();

    if (address && chain && activeVault) {
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      fetchTokenAllowance(activeVault.token.address, address, borrowerOperationsAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMintAmount]);

  useEffect(() => {
    if (address && activeVault) {
      fetchTokenbalance(activeVault.token.address, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, activeVault?.token]);

  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-[12px] leading-[24px]">Mint GREEN</p>
        <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
          <input
            type="number"
            placeholder="1.00 GREEN"
            value={mintAmount}
            onChange={handleMintInputChange}
            className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
          />
          <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
            <button type="button" onClick={setMintToMax} className="font-bold">
              Max
            </button>
          </div>
        </div>
      </div>

      <div className="text-[12px] text-lightGray font-medium leading-[24px]">
        <div className="flex items-center justify-between gap-3">
          <p>Collateral ratio change</p>
          <p className="text-primaryColor">
            129% -{">"} <span className="text-[#C84D1E]"> 119%</span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p>Placeholder information</p>
          <p>Add more as needed</p>
        </div>
      </div>

      <div>
        <ButtonStyle1
          disabled={!isConnected || !isMintValid}
          text="Mint"
          action={handleCtaFunctions}
        />
      </div>
    </div>
  );
};

export default MintPosition;
