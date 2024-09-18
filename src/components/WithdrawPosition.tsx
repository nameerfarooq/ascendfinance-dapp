"use client";
import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useDispatch } from "react-redux";
import { formatUnits, parseEther, parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import type { VaultType } from "@/types";
import { formatDecimals } from "@/utils/formatters";

import ButtonStyle1 from "./Buttons/ButtonStyle1";

interface WithdrawPositionProps {
  activeVault: VaultType | undefined;
  collateralRatio: string;
  setPingAmountChange: Dispatch<SetStateAction<string>>;
}
const WithdrawPosition: React.FC<WithdrawPositionProps> = ({ activeVault, collateralRatio, setPingAmountChange }) => {
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const { chain, address } = useAccount();
  const {
    convertYieldTokensToShares,
    convertSharesToYieldTokens,

  } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { withdrawColl } = useBorrowerOperations();
  const [withdrawAmount, setwithdrawAmount] = useState("");
  const debouncedwithdrawAmount = useDebounce(withdrawAmount, 350);
  const [isWithdrawValid, setisWithdrawValid] = useState(false);
  const [error, setError] = useState("");
  const [alreadyDepositedTokens, setAlreadyDepositedTokens] = useState('');
  const dispatch = useDispatch();
  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const { isRecoveryMode } = useAppSelector((state) => state.protocol.protocol);
  const { latestBlockNumber } = useAppSelector((state) => state.protocol);
  const { globalSystemBalances, CCR_value, TCR_value } = useAppSelector(
    (state) => state.protocol.borrowerOp,
  );
  const { MCR_value, troveCollateralShares, troveCollateralTokens, troveDebt, troveOwnersCount } = useAppSelector(
    (state) => state.protocol.trove,
  );
  const [existingSharesAndDebt, setexistingSharesAndDebt] = useState<bigint[]>([]);
  const [btnLoading, setbtnLoading] = useState(false);
  const [newCollRatio, setNewCollRatio] = useState("");

  const getAlreadyDepositedTokens = async () => {
    if (address && chain && activeVault) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;



      setexistingSharesAndDebt([BigInt(troveCollateralShares), BigInt(troveDebt)]);
      const depositedTokens = await convertSharesToYieldTokens(
        troveManagerAddress,
        BigInt(troveCollateralShares),
      );
      setAlreadyDepositedTokens(depositedTokens.toString());
    } else {
      setAlreadyDepositedTokens("");

    }
  };
  const handleWithdrawInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setwithdrawAmount(value);
  };

  const setInputValueMax = async () => {
    if (activeVault) {
      setwithdrawAmount(formatUnits(BigInt(alreadyDepositedTokens), activeVault.token.decimals));
    }
  };

  const getTokenWithdrawed = async (
    troveManagerAddress: Address,
    multiCollateralHintHelpersAddress: Address,
    sortedTrovesAddress: Address,
    borrowerOperationsAddress: Address,
    amount: bigint,
  ) => {
    try {
      setbtnLoading(true);
      if (activeVault) {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Withdrawing",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
      }
      if (address && activeVault) {
        // Step#1
        const sharesAmount = await convertYieldTokensToShares(troveManagerAddress, amount);
        console.log("sharesAmount: ", sharesAmount);


        // // Step#3
        const totalShares = BigInt(troveCollateralShares) - sharesAmount;
        console.log("totalShares: ", totalShares);

        // // Step # 4
        const NCIR = await computeNominalCR(
          multiCollateralHintHelpersAddress,
          totalShares,
          BigInt(troveDebt),
        );
        console.log("NCIR: ", NCIR);



        // // Step#6
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

        // // Step#7
        const insertPosition = await findInsertPosition(
          sortedTrovesAddress,
          NCIR,
          approxHint[0],
          approxHint[0],
        );

        // // Step#8
        const tx = await withdrawColl(
          borrowerOperationsAddress,
          troveManagerAddress,
          address,
          amount,
          insertPosition[0],
          insertPosition[1],
        );
        console.log("tx: ", tx);
        if (tx?.status === "success") {
          setwithdrawAmount("");
          setPingAmountChange("1")

        }
        getAlreadyDepositedTokens()

        setbtnLoading(false);

      }
    } catch (error) {
      setbtnLoading(false);

      if (activeVault) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Withdrawing",
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

      getTokenWithdrawed(
        troveManagerAddress,
        multiCollateralHintHelpersAddress,
        sortedTrovesAddress,
        borrowerOperationsAddress,
        parseUnits(debouncedwithdrawAmount, activeVault.token.decimals),
      );
    } else {
      console.log("wallet not connected.");
    }
  };
  const getWithdrawValidated = async () => {
    setbtnLoading(true);
    if (address && chain && activeVault && debouncedwithdrawAmount) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;

      //step 1, 2, 3
      const withdrawAmountInWei = parseUnits(debouncedwithdrawAmount, activeVault.token.decimals);

      if (withdrawAmountInWei <= 0n) {
        setisWithdrawValid(false);
        setError("Your desired withdraw amount should be greater than 0");
      } else {
        setError("");

        //step 4

        const sharesToWithdraw = await convertYieldTokensToShares(
          troveManagerAddress,
          parseEther(debouncedwithdrawAmount),
        );


        console.log("existingSharesAndDebt :", existingSharesAndDebt);

        const newShares = existingSharesAndDebt[0] - sharesToWithdraw;
        console.log("newShares :", newShares);

        //step 5

        const tokensTobeWithdrawn = await convertSharesToYieldTokens(
          troveManagerAddress,
          newShares,
        );
        console.log("tokensTobeWithdrawn :", tokensTobeWithdrawn);

        //step 6, 7, 10

        console.log("isRecoveryMode : ", isRecoveryMode);

        //step 8

        console.log("MCR_value : ", MCR_value);

        //step 9

        const totalPricedCollateral = globalSystemBalances.totalPricedCollateral;

        const userICR = (tokensTobeWithdrawn * BigInt(priceInUSD)) / existingSharesAndDebt[1];
        console.log("userICR", userICR);

        //step 12

        const newTotalPricedColl =
          BigInt(totalPricedCollateral) - withdrawAmountInWei * BigInt(priceInUSD);
        console.log("newTotalPricedColl :", newTotalPricedColl);
        const newTCR = BigInt(newTotalPricedColl) / BigInt(globalSystemBalances?.totalDebt);
        console.log("newTCR : ", newTCR);
        console.log("newTCR formatted:", formatUnits(newTCR, activeVault.token.decimals));
        console.log("CCR_value :", CCR_value);
        console.log("TCR_value :", TCR_value);
        if (isRecoveryMode) {
          setisWithdrawValid(false);
          setError("Collateral withdrawal not permitted during Recovery Mode");
        } else if (withdrawAmountInWei > BigInt(alreadyDepositedTokens)) {
          setisWithdrawValid(false);
          setError("Your desired withdraw amount is greater than deposited token");
        } else if (userICR < BigInt(MCR_value)) {
          setisWithdrawValid(false);
          setError("Collateral ratio should be above MCR");
        } else if (newTCR < BigInt(CCR_value)) {
          setisWithdrawValid(false);
          setError("Your Position will cause the GTCR to drop below CCR");
        } else {
          setisWithdrawValid(true);
          setError("");
        }
      }
    }
    setbtnLoading(false);
  };
  useEffect(() => {
    const calcRatios = async () => {
      if (address && chain && activeVault) {

        const tokensTobeWithdrawn = parseUnits(
          debouncedwithdrawAmount,
          activeVault?.token?.decimals,
        );
        const newCollAmount = BigInt(troveCollateralTokens) - tokensTobeWithdrawn;


        const newCollRatio = (newCollAmount * BigInt(priceInUSD)) / existingSharesAndDebt[1];
        console.log("newCollRatio :", newCollRatio);
        setNewCollRatio(formatUnits(newCollRatio, activeVault.token.decimals));
      }
    };
    if (existingSharesAndDebt[0] && existingSharesAndDebt[1] && debouncedwithdrawAmount > "0") {
      calcRatios();
    } else {
      setNewCollRatio("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedwithdrawAmount, latestBlockNumber]);

  useEffect(() => {
    if (existingSharesAndDebt[0]) {
      getWithdrawValidated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedwithdrawAmount, address, activeVault, existingSharesAndDebt]);

  useEffect(() => {

    getAlreadyDepositedTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain, activeVault]);

  return (
    <div className="flex flex-col gap-8 pt-12">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-[12px] leading-[24px]">Withdraw weETH</p>
        <div
          className={`${error ? "border-[#FF5710]" : "border-transparent"}  border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
        >
          <input
            value={withdrawAmount}
            onChange={handleWithdrawInputChange}
            type="number"
            disabled={alreadyDepositedTokens == ''}
            placeholder="0.29 weETH"
            className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
          />
          <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
            {alreadyDepositedTokens &&
              <button onClick={setInputValueMax} className="font-bold">
                Max
              </button>
            }
          </div>
        </div>
        <div className="h-[20px] flex items-center">
          {error && <p className="text-[#FF5710]">{error}</p>}
        </div>
      </div>

      <div className="text-[12px] text-lightGray font-medium leading-[24px]">
        <div className="flex items-center justify-between gap-3">
          <p>Collateral ratio change</p>
          <p className="text-primaryColor">
            {collateralRatio}%{" "}
            {newCollRatio && !error && (
              <span>
                -{">"}{" "}
                <span className="text-[#C84D1E]"> {formatDecimals(Number(newCollRatio), 2)}%</span>
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p>Placeholder information</p>
          <p>Add more as needed</p>
        </div>
      </div>
      <div>
        <ButtonStyle1
          btnLoading={btnLoading}
          disabled={!isWithdrawValid || withdrawAmount == "0" || btnLoading}
          action={handleCtaFunctions}
          text="Withdraw"
        />
      </div>
    </div>
  );
};

export default WithdrawPosition;
