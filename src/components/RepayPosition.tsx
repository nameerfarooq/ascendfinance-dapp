"use client";

import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import type { VaultType } from "@/types";
import { getDefaultChainId } from "@/utils/chain";
import { formatDecimals } from "@/utils/formatters";

interface RepayPositionProps {
  activeVault: VaultType | undefined;
  setPingAmountChange: Dispatch<SetStateAction<string>>;
  collateralRatio: string
}
const RepayPosition: React.FC<RepayPositionProps> = ({ activeVault, collateralRatio, setPingAmountChange }) => {
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const { isRecoveryMode } = useAppSelector((state) => state.protocol.protocol);
  const { CCR_value, globalSystemBalances, minNetDebt } = useAppSelector(
    (state) => state.protocol.borrowerOp,
  );
  const { troveCollateralShares, troveCollateralTokens, troveDebt, troveOwnersCount } = useAppSelector(
    (state) => state.protocol.trove,
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const { isConnected, chain, address } = useAccount();
  const { balanceOf } = useERC20Contract();
  const {
    // getTroveOwnersCount,
    // getTroveCollSharesAndDebt,
    convertSharesToYieldTokens,
    // fetchPriceInUsd,
  } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { repayDebt, closeTrove } = useBorrowerOperations();

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const defaultChainId: number = getDefaultChainId(chain);
  const [btnLoading, setbtnLoading] = useState(false);

  const [repayAmount, setRepayAmount] = useState<string>("");
  const [isValidated, setIsValidated] = useState(false);
  const [alreadyMintedDebt, setAlreadyMintedDebt] = useState('');
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n);
  const [isPositionClosing, setIsPositionClosing] = useState<boolean>(false);
  const [newCollateralRatio, setNewCollateralRatio] = useState('')
  const debouncedRepayAmount = useDebounce(repayAmount, 350);

  const fetchTokenbalance = (tokenAddress: Address, walletAddress: Address) => {
    if (address) {
      balanceOf(tokenAddress, walletAddress).then((balance) => {
        setTokenBalance(balance);
      });
    }
  };

  const handleRepayInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setRepayAmount(value);
  };

  const setRepayToMax = () => {
    if (activeVault) {
      console.log("alreadyMintedDebt.toString() :", alreadyMintedDebt.toString());
      setRepayAmount(formatUnits(BigInt(alreadyMintedDebt), activeVault.token.decimals));
    }
  };

  const closePosition = async (
    borrowerOperationsAddress: Address,
    troveManagerAddress: Address,
    address: Address,
  ) => {
    if (address && activeVault) {
      // Step#1
      const tx = await closeTrove(borrowerOperationsAddress, troveManagerAddress, address);
      console.log("tx: ", tx);
      if (tx?.status === "success") {
        setPingAmountChange("1")
        setTimeout(() => {
          router.push("/positions");
        }, 4000);
      }
    }
  };

  const getTokenRepayed = async (
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
            text1: "Repaying",
            text2: `${formatUnits(amount, activeVault.token.decimals)} GREEN`,
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
        const userDebt =
          BigInt(troveDebt) - parseUnits(debouncedRepayAmount, activeVault.token.decimals);
        console.log("userDebt", userDebt);

        // Step # 3
        const NCIR = await computeNominalCR(
          multiCollateralHintHelpersAddress,
          BigInt(troveCollateralShares),
          userDebt,
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
        const tx = await repayDebt(
          borrowerOperationsAddress,
          troveManagerAddress,
          address,
          amount,
          insertPosition[0],
          insertPosition[1],
        ).then(() => {
          const debtTokenAddress: Address =
            CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId].DEBT_TOKEN;
          fetchTokenbalance(debtTokenAddress, address);
          setRepayAmount("");
          setAlreadyMintedDebt('')
          setPingAmountChange("1")
          getAlreadyMintedDebt();
        });
        console.log("tx: ", tx);

      }
    } catch (error) {
      if (activeVault) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Repaying",
            text2: `${formatUnits(amount, activeVault.token.decimals)} GREEN`,
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
      const deboundedInBigInt = parseUnits(debouncedRepayAmount, activeVault.token.decimals);
      if (deboundedInBigInt === BigInt(alreadyMintedDebt)) {
        closePosition(borrowerOperationsAddress, troveManagerAddress, address);
      } else {
        getTokenRepayed(
          troveManagerAddress,
          multiCollateralHintHelpersAddress,
          sortedTrovesAddress,
          borrowerOperationsAddress,
          parseUnits(debouncedRepayAmount, activeVault.token.decimals),
        );
      }
    } else {
      console.log("wallet not connected.");
    }
  };

  const userLevelChecks = async () => {
    if (isConnected && address && chain?.id && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId].troves[activeVault.token.address]
          .TROVE_MANAGER;

      const repayAmountBigInt = parseUnits(repayAmount, 18);
      // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);
      const newUserDebt = BigInt(troveDebt) - repayAmountBigInt;

      setIsPositionClosing(false);

      if (tokenBalance < repayAmountBigInt) {
        setError("Insufficient balance");
        setWarning("");
        setIsValidated(false);
      } else if (newUserDebt < 0n) {
        setError("Repay amount exceeds user debt");
        setWarning("");
        setIsValidated(false);
      } else if (newUserDebt < BigInt(minNetDebt) && newUserDebt !== 0n) {
        setError(
          `User's net debt must be greater than minimum ${formatDecimals(parseFloat(formatUnits(BigInt(minNetDebt), 18)), 2)}`,
        );
        setWarning("");
        setIsValidated(false);
      } else if (newUserDebt === 0n) {
        setIsPositionClosing(true);

        if (!isRecoveryMode) {
          const yieldTokens = await convertSharesToYieldTokens(
            troveManagerAddress,
            BigInt(troveCollateralShares),
          );
          // const priceInUSD = await fetchPriceInUsd(troveManagerAddress);
          const newTotalDebt = BigInt(globalSystemBalances.totalDebt) - repayAmountBigInt;
          const newTotalPricedColl =
            BigInt(globalSystemBalances.totalPricedCollateral) - yieldTokens * BigInt(priceInUSD);
          const newTCR = newTotalPricedColl / newTotalDebt;

          if (newTCR < BigInt(CCR_value)) {
            setError("Your Position will cause the GTCR to drop below CCR");
            setWarning("");
            setIsValidated(false);

          }
        } else {
          setError("");
          setWarning(
            "Your desired repay amount is equal to minted token, Your position will be closed if you proceed",
          );
          setIsValidated(true);

        }
      }
    }
    setbtnLoading(false)

  };
  const calcNewCollRatio = () => {
    if (activeVault) {
      if (
        repayAmount &&
        repayAmount !== "" &&
        priceInUSD &&
        priceInUSD !== "" &&
        priceInUSD !== "0"
      ) {
        const newDebtAmount = BigInt(troveDebt) - parseUnits(debouncedRepayAmount, 18);
        if (newDebtAmount > 0n) {
          const collRatio =
            ((BigInt(troveCollateralTokens) * BigInt(priceInUSD)) / newDebtAmount) * 100n;
          setNewCollateralRatio(
            parseFloat(formatDecimals(parseFloat(formatUnits(collRatio, 18)), 2)).toString()
          );
        } else {
          setNewCollateralRatio("0");
        }
      } else {
        setNewCollateralRatio("");
      }
    }
  };
  useEffect(() => {
    if (repayAmount > "0") {
      calcNewCollRatio()
    }
  }, [debouncedRepayAmount, isRecoveryMode])
  const getAlreadyMintedDebt = async () => {
    if (address && chain && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;

      // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
      //   troveManagerAddress,
      //   address,
      // );
      // console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);
      console.log("running")
      const mintedTokens = await convertSharesToYieldTokens(
        troveManagerAddress,
        BigInt(troveDebt),
      );

      setAlreadyMintedDebt(mintedTokens.toString());
    }
  };
  useEffect(() => {

    getAlreadyMintedDebt();

    if (address) {
      const debtTokenAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][defaultChainId].DEBT_TOKEN;
      fetchTokenbalance(debtTokenAddress, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address, activeVault]);
  const getValidate = async () => {
    setbtnLoading(true)
    if (address && chain && activeVault && repayAmount) {
      const repayAmountLocal = parseUnits(debouncedRepayAmount, activeVault.token.decimals);

      setIsPositionClosing(false);

      if (repayAmountLocal <= 0n) {
        setIsValidated(false);
        setError("Your desired Repay amount should be greater than 0");
        setWarning("");
      } else if (repayAmountLocal > BigInt(alreadyMintedDebt)) {
        setIsValidated(false);
        setError("Your desired repay amount is greater than minted token");
        setWarning("");
      } else if (repayAmountLocal === BigInt(alreadyMintedDebt)) {
        setWarning(
          "Your desired repay amount is equal to minted token, Your position will be closed if you proceed",
        );
        setIsValidated(true);
        setError("");
        setIsPositionClosing(true);
      } else {
        setIsValidated(true);
        setWarning("");
        setError("");
      }

    } else {
      setIsValidated(true);
      setWarning("");
      setError("");

    }

    userLevelChecks();
  };
  useEffect(() => {

    getValidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRepayAmount, isConnected, chain, address, activeVault, tokenBalance]);

  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-[12px] leading-[24px]">Repay GREEN</p>
        <div
          className={`${error ? "border-[#FF5710]" : warning ? "border-[#ffd025]" : "border-transparent"}  border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
        >
          <input
            value={repayAmount}
            onChange={handleRepayInputChange}
            type="number"
            placeholder="100 GREEN"
            disabled={alreadyMintedDebt == ''}

            className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
          />
          <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
            {alreadyMintedDebt &&
              <button onClick={setRepayToMax} className="font-bold">
                Max
              </button>
            }
          </div>
        </div>
        <div className="h-[20px] flex items-center">
          {error && <p className="text-[#FF5710]">{error}</p>}
          {warning && <p className="text-[#ffd025]">{warning}</p>}
        </div>
      </div>

      {isPositionClosing && isRecoveryMode && (
        <div className="flex items-center justify-center rounded-lg p-4 border bg-[#ff4c0036] border-[#FF5710] text-[14px] text-[#FF5710]">
          <p>Position can not be closed during Recovery Mode</p>
        </div>
      )}

      <div className="text-[12px] text-lightGray font-medium leading-[24px]">
        <div className="flex items-center justify-between gap-3">
          <p>Collateral ratio change</p>
          <p className="text-primaryColor">{collateralRatio}% {newCollateralRatio && !error && <span> -{">"} {newCollateralRatio}%</span>}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p>Placeholder information</p>
          <p>Add more as needed</p>
        </div>
      </div>
      <div>
        <ButtonStyle1 disabled={!isValidated || btnLoading} action={handleCtaFunctions} text="Repay" btnLoading={btnLoading} />
      </div>
    </div>
  );
};

export default RepayPosition;
