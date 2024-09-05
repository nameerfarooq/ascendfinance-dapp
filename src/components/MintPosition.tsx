"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

import { useDispatch } from "react-redux";
import { formatUnits, parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import type { VaultType } from "@/types";

interface MintPositionProps {
  activeVault: VaultType | undefined;
  setPingAmountChange: Dispatch<SetStateAction<string>>;
}

const MintPosition: FC<MintPositionProps> = ({ activeVault }) => {
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const { isPaused, isRecoveryMode } = useAppSelector((state) => state.protocol.protocol);
  const {
    isVMPaused,
    isSunSetting,
    MCR_value,
    troveCollateralShares,
    troveDebt,
    troveOwnersCount,
  } = useAppSelector((state) => state.protocol.trove);
  const { CCR_value, globalSystemBalances } = useAppSelector((state) => state.protocol.borrowerOp);

  const { isConnected, chain, address } = useAccount();
  const {
    // getTroveOwnersCount,
    // getTroveCollSharesAndDebt,
    convertSharesToYieldTokens,
    // fetchPriceInUsd,
    // MCR,
  } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { withdrawDebt } = useBorrowerOperations();
  const dispatch = useDispatch();
  const [mintAmount, setMintAmount] = useState<string>("");
  const [maxMintableAmount, setMaxMintableAmount] = useState<bigint>(0n);
  const [isMintValid, setIsMintValid] = useState<boolean>(false);
  const [minterror, setMintError] = useState<string>("");
  // const [tokenPrice_USD, setTokenPrice_USD] = useState<bigint>(0n);

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const debouncedMintAmount = useDebounce(mintAmount, 350);

  const handleMintInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setMintAmount(value);
  };

  const setMintToMax = () => {
    const maxMintAmount = formatUnits(maxMintableAmount, 18);
    setMintAmount(maxMintAmount);
  };

  const getTokenMinted = async (
    troveManagerAddress: Address,
    multiCollateralHintHelpersAddress: Address,
    sortedTrovesAddress: Address,
    borrowerOperationsAddress: Address,
    amount: bigint,
  ) => {
    try {
      if (activeVault) {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Minting",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
      if (address && activeVault) {
        // Step#1
        // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
        //   troveManagerAddress,
        //   address,
        // );
        // console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);

        // Step#2
        const totalDebt = BigInt(troveCollateralShares) + amount;

        // Step#3
        const NCIR = await computeNominalCR(
          multiCollateralHintHelpersAddress,
          BigInt(troveCollateralShares),
          totalDebt,
        );
        console.log("NCIR: ", NCIR);

        // Step#4
        // const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
        // console.log("troveOwnersCount: ", troveOwnersCount);

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
        ).then(() => {
          calcMaxMintableAmount(BigInt(priceInUSD));
          setMintAmount("");
        });
        console.log("tx: ", tx);
      }
    } catch (error) {
      if (activeVault) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Minting",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
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

  const calcMaxMintableAmount = async (priceInUSD: bigint) => {
    if (isConnected && address && chain && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;

      // 1) Fetch Collateral Shares & Debt
      // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);

      // 2) Convert Shares to Yield token
      const yieldTokens = await convertSharesToYieldTokens(
        troveManagerAddress,
        BigInt(troveCollateralShares),
      );

      // 3) Fetch USD Price
      // const priceInUSD1 = await fetchPriceInUsd(troveManagerAddress);

      // 4) Fetch Minimum Collateral Ratio (MCR)
      // const minCollateralRatio1 = await MCR(troveManagerAddress);
      const minCollateralRatio = BigInt(MCR_value);

      // 5) Calculate Max & Additional Debt
      const maxDebtAllowed = (priceInUSD * yieldTokens) / minCollateralRatio;
      const additionalDebtAllowed = maxDebtAllowed - BigInt(troveDebt);
      setMaxMintableAmount(additionalDebtAllowed);
    }
  };

  const checkUserLevelValidations = async () => {
    if (isConnected && address && chain && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;

      const amount = parseUnits(mintAmount || "0", 18);

      // 1) Fetch Collateral Shares & Debt
      // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);

      // 2) Convert Shares to Yield token
      const yieldTokens = await convertSharesToYieldTokens(
        troveManagerAddress,
        BigInt(troveCollateralShares),
      );

      // 3) Calculate User Debt
      const totalUserDebt = BigInt(troveDebt) + amount;

      // 4) Calculate Collateral Ratio
      const userICR = (yieldTokens * BigInt(priceInUSD)) / totalUserDebt;

      // 5) Calculate Total Collateral Ratio
      const newTotalDebt = BigInt(globalSystemBalances.totalDebt) + amount;
      const newTCR = BigInt(globalSystemBalances.totalPricedCollateral) / newTotalDebt;

      if (isRecoveryMode) {
        setIsMintValid(false);
      } else if (userICR < BigInt(MCR_value)) {
        setIsMintValid(false);
        setMintError("Collateral ratio should be above MCR");
      } else if (newTCR < BigInt(CCR_value)) {
        setIsMintValid(false);
        setMintError("Your Position will cause the GTCR to drop below CCR");
      }
    }
  };

  const validateMint = async () => {
    if (isPaused || isVMPaused || isSunSetting) {
      setIsMintValid(false);
      return;
    }

    let amount = 0n;

    if (activeVault) {
      amount = parseUnits(mintAmount, 18);
    }

    if (mintAmount === "") {
      setMintError("");
      setIsMintValid(false);
    } else if (parseFloat(mintAmount) <= 0) {
      setIsMintValid(false);
      setMintError("Desired mint value must be greater than 0");
    } else if (amount > 0n && amount <= maxMintableAmount) {
      setIsMintValid(true);
      setMintError("");
    } else if (amount > 0n && amount > maxMintableAmount) {
      setIsMintValid(false);
      setMintError("Desired mint value is greater than tokens available for mint");
    }

    checkUserLevelValidations();
  };

  useEffect(() => {
    validateMint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMintAmount, isRecoveryMode]);

  useEffect(() => {
    if (address && chain && activeVault) {
      calcMaxMintableAmount(BigInt(priceInUSD));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, activeVault?.token, priceInUSD]);

  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-[12px] leading-[24px]">Mint GREEN</p>
        <div
          className={`${mintAmount !== "" && minterror ? "border-[#FF5710]" : "border-transparent"} border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
        >
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
        {mintAmount !== "" && minterror && <p className="text-[#FF5710] mt-4">{minterror}</p>}
      </div>

      {(isPaused || isVMPaused || isSunSetting || isRecoveryMode) && (
        <div className="flex items-center justify-center rounded-lg p-4 border bg-[#ff4c0036] border-[#FF5710] text-[14px] text-[#FF5710]">
          <p>
            {isPaused
              ? "Protocol is currently paused"
              : isVMPaused
                ? "The collateral type is currently paused"
                : isSunSetting
                  ? "The collateral type is currently being sunset"
                  : isRecoveryMode
                    ? "Additional debt not permitted during Recovery Mode"
                    : ""}
          </p>
        </div>
      )}

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
