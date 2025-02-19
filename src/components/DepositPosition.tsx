"use client";

import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { useDispatch } from "react-redux";
import { formatUnits, parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import ToolTip from "@/components/ToolTip";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import type { PositionStatsType, VaultType } from "@/types";
import { formatDecimals } from "@/utils/formatters";

interface DepositPositionProps {
  activeVault: VaultType | undefined;
  positionStats: PositionStatsType;
  setPingAmountChange: Dispatch<SetStateAction<string>>;
}

const DepositPosition: React.FC<DepositPositionProps> = ({
  activeVault,
  positionStats,
  setPingAmountChange,
}) => {
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const { isPaused } = useAppSelector((state) => state.protocol.protocol);
  const {
    isVMPaused,
    isSunSetting,
    troveCollateralShares,
    troveDebt,
    troveCollateralTokens,
    troveOwnersCount,
  } = useAppSelector((state) => state.protocol.trove);

  const dispatch = useDispatch();
  const { isConnected, chain, address } = useAccount();
  const { balanceOf, allowance, approve } = useERC20Contract();
  const { convertYieldTokensToShares } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { addColl } = useBorrowerOperations();

  const [zap, setZap] = useState<0 | 1 | 2>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [isAllowanceEnough, setIsAllowanceEnough] = useState<boolean>(false);
  const [isDepositValid, setIsDepositValid] = useState<boolean>(false);
  const [depositerror, setDepositError] = useState<string>("");
  const [newCollateralRatio, setNewCollateralRatio] = useState<number | string>(0);
  const [btnLoading, setbtnLoading] = useState(false);

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const debouncedDepositAmount = useDebounce(depositAmount, 350);

  const fetchTokenbalance = (tokenAddress: Address, walletAddress: Address) => {
    if (address) {
      balanceOf(tokenAddress, walletAddress).then((balance) => {
        setTokenBalance(balance.toString());
      });
    }
  };

  const fetchTokenAllowance = (
    tokenAddress: Address,
    ownerAddress: Address,
    spenderAddress: Address,
  ) => {
    if (address && depositAmount && activeVault) {
      allowance(tokenAddress, ownerAddress, spenderAddress).then((result) => {
        console.log("Allowance: ", result);
        console.log("depositAmount: ", depositAmount);
        console.log(
          "isAllowanceEnough: ",
          result >= parseUnits(depositAmount, activeVault.token.decimals),
        );

        if (result >= parseUnits(depositAmount, activeVault.token.decimals)) {
          setIsAllowanceEnough(true);
        } else {
          setIsAllowanceEnough(false);
        }
      });
    }
  };

  const handleDepositInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setDepositAmount(value);
  };

  const getTokenApproved = async (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
  ) => {
    if (address && depositAmount) {
      await approve(tokenAddress, spenderAddress, amount).then((tx) => {
        console.log("Approved: ", tx);
        fetchTokenAllowance(tokenAddress, address, spenderAddress);
      });
    }
  };

  const setDepositToMax = () => {
    if (activeVault) {
      const maxDepositAmount = formatUnits(BigInt(tokenBalance), activeVault.token.decimals);
      setDepositAmount(maxDepositAmount);
    }
  };

  const getTokenDeposited = async (
    troveManagerAddress: Address,
    multiCollateralHintHelpersAddress: Address,
    sortedTrovesAddress: Address,
    borrowerOperationsAddress: Address,
    amount: bigint,
  ) => {
    try {
      setbtnLoading(true);
      if (address && activeVault) {
        dispatch(
          setLoader({
            condition: "loading",
            text1: "Depositing",
            text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
          }),
        );
        // Step#1
        const sharesAmount = await convertYieldTokensToShares(troveManagerAddress, amount);
        console.log("sharesAmount: ", sharesAmount);

        // Step#2
        // const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
        //   troveManagerAddress,
        //   address,
        // );
        // console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);

        // Step#3
        const totalShares = sharesAmount + BigInt(troveCollateralShares);
        console.log("totalShares: ", totalShares);

        // Step # 4
        const NCIR = await computeNominalCR(
          multiCollateralHintHelpersAddress,
          totalShares,
          BigInt(troveDebt),
        );
        console.log("NCIR: ", NCIR);

        // Step#5
        // const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
        // console.log("troveOwnersCount: ", troveOwnersCount);

        // Step#6
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

        // Step#7
        const insertPosition = await findInsertPosition(
          sortedTrovesAddress,
          NCIR,
          approxHint[0],
          approxHint[0],
        );
        console.log("insertPosition: ", insertPosition);

        // Step#8
        const tx = await addColl(
          borrowerOperationsAddress,
          troveManagerAddress,
          address,
          parseUnits(depositAmount, activeVault.token.decimals),
          insertPosition[0],
          insertPosition[1],
        ).then(() => {
          setDepositAmount("");
          setPingAmountChange("1")
          fetchTokenbalance(activeVault.token.address, address);

          if (address && chain) {
            const borrowerOperationsAddress: Address =
              CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
            fetchTokenAllowance(activeVault.token.address, address, borrowerOperationsAddress);
          }
        });
        console.log("tx: ", tx);
      }
      setbtnLoading(false);
    } catch (error) {
      setbtnLoading(false);

      if (activeVault) {
        dispatch(
          setLoader({
            condition: "failed",
            text1: "Depositing",
            text2: `${formatUnits(amount, activeVault?.token.decimals)} ${activeVault?.token.symbol}`,
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

      if (isAllowanceEnough) {
        getTokenDeposited(
          troveManagerAddress,
          multiCollateralHintHelpersAddress,
          sortedTrovesAddress,
          borrowerOperationsAddress,
          parseUnits(depositAmount, activeVault.token.decimals),
        );
      } else {
        getTokenApproved(
          activeVault.token.address,
          borrowerOperationsAddress,
          parseUnits(depositAmount, activeVault.token.decimals),
        );
      }
    } else {
      console.log("wallet not connected.");
    }
  };

  const validateDeposit = () => {
    setbtnLoading(true);

    if (isPaused || isVMPaused || isSunSetting) {
      setIsDepositValid(false);
      return;
    }

    let amount = 0n;

    if (activeVault) {
      amount = parseUnits(depositAmount, activeVault?.token.decimals);
    }

    if (depositAmount === "") {
      setDepositError("");
      setIsDepositValid(false);
    } else if (parseFloat(depositAmount) <= 0) {
      setIsDepositValid(false);
      setDepositError("Deposit amount must be greater than 0");
    } else if (amount > 0n && amount <= BigInt(tokenBalance)) {
      setIsDepositValid(true);
      setDepositError("");
    } else if (amount > 0n && amount > BigInt(tokenBalance)) {
      setIsDepositValid(false);
      setDepositError("Deposit amount is greater than token balance");
    }
    setbtnLoading(false);
  };

  const calcNewCollRatio = () => {
    if (activeVault) {
      if (
        depositAmount &&
        depositAmount !== "" &&
        priceInUSD &&
        priceInUSD !== "" &&
        priceInUSD !== "0"
      ) {
        const newCollAmount =
          BigInt(troveCollateralTokens) + parseUnits(depositAmount, activeVault?.token.decimals);

        console.log("newCollAmount: ", newCollAmount);
        const collRatio = ((newCollAmount * BigInt(priceInUSD)) / BigInt(troveDebt)) * 100n;

        console.log("collRatio: ", collRatio);

        setNewCollateralRatio(formatDecimals(parseFloat(formatUnits(collRatio, 18)), 2));
      } else {
        setNewCollateralRatio(0);
      }
    }
  };

  useEffect(() => {
    setPingAmountChange(depositAmount);
    validateDeposit();
    calcNewCollRatio();

    if (address && chain && activeVault) {
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      fetchTokenAllowance(activeVault.token.address, address, borrowerOperationsAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDepositAmount]);

  useEffect(() => {
    if (address && activeVault) {
      fetchTokenbalance(activeVault.token.address, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, activeVault?.token]);

  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
          <p className="font-medium text-[12px] leading-[24px]">
            Deposit {activeVault?.token.symbol}
          </p>
          <div className="flex w-full sm:w-6/12 gap-4 items-center">
            <p className="font-medium text-[12px] leading-[24px] flex gap-3 items-center">
              Zap{" "}
              <ToolTip text="Tooltip text goes here with additional information about the item." />{" "}
            </p>
            <div className="rounded-2xl bg-secondaryColor flex items-center w-full">
              <div
                onClick={() => setZap(0)}
                className={`${zap == 0 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
              >
                Off
              </div>

              <div
                onClick={() => setZap(1)}
                className={`${zap == 1 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
              >
                ETH
              </div>

              <div
                onClick={() => setZap(2)}
                className={`${zap == 2 && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
              >
                wETH
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${depositerror ? "border-[#FF5710]" : "border-transparent"} border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
        >
          <input
            type="number"
            placeholder={`1.000 ${activeVault?.token.symbol}`}
            value={depositAmount}
            onChange={handleDepositInputChange}
            disabled={tokenBalance == ''}
            className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
          />
          <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
            {tokenBalance && (
              <button type="button" onClick={setDepositToMax} className="font-bold">
                Max
              </button>
            )}
          </div>
        </div>
        {depositerror && <p className="text-[#FF5710] mt-4 text-[12px]">{depositerror}</p>}
      </div>

      {(isPaused || isVMPaused || isSunSetting) && (
        <div className="flex items-center justify-center rounded-lg p-4 border bg-[#ff4c0036] border-[#FF5710] text-[14px] text-[#FF5710]">
          <p>
            {isPaused
              ? "Protocol is currently paused"
              : isVMPaused
                ? "The collateral type is currently paused"
                : isSunSetting
                  ? "The collateral type is currently being sunset"
                  : ""}
          </p>
        </div>
      )}

      <div className="text-[12px] text-lightGray font-medium leading-[24px]">
        <div
          className={`${zap > 0 ? "h-[100px] sm:h-[60px] opacity-100" : "opacity-0 h-0 overflow-hidden"} smooth-transition`}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p>Exchange rate</p>
            <p>(1,16495) 1.00 ETH to 0.85 weETH</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p>Actual deposit</p>
            <p>
              {" "}
              <span className="font-bold text-white"> 0.85 weETH </span>= $3 929.00{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p>Collateral ratio change</p>
          <p>
            {positionStats.collateralRatio ? (
              <span className="text-primaryColor">{`${positionStats.collateralRatio}%`}</span>
            ) : (
              "-"
            )}

            {newCollateralRatio && !depositerror ? (
              <span className="text-[#C84D1E]">
                {" -> "}
                {`${newCollateralRatio}%`}
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p>Placeholder information</p>
          <p>Add more as needed</p>
        </div>
      </div>

      <div>
        <ButtonStyle1
          disabled={!isConnected || !isDepositValid || btnLoading}
          text={`${!isAllowanceEnough ? "Approve" : "Deposit"} ${activeVault?.token.symbol}`}
          action={handleCtaFunctions}
          btnLoading={btnLoading}
        />
      </div>
    </div>
  );
};

export default DepositPosition;
