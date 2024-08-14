"use client";

import { useEffect, useState, type ChangeEvent } from "react";

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
import type { VaultType } from "@/types";

interface DepositPositionProps {
  activeVault: VaultType | undefined;
}

const DepositPosition: React.FC<DepositPositionProps> = ({ activeVault }) => {
  const { isConnected, chain, address } = useAccount();
  const { balanceOf, allowance, approve } = useERC20Contract();
  const { convertYieldTokensToShares, getTroveOwnersCount } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { openTrove } = useBorrowerOperations();

  const [zap, setZap] = useState<0 | 1 | 2>(0);
  const [depositAmount, setDepositAmount] = useState<string>("0");
  const [mintAmount, setMintAmount] = useState<string>("0");
  const [isDebtRatioAuto, setIsDebtRatioAuto] = useState<boolean>(true);
  const [collateralRatio, setCollateralRatio] = useState<string>(
    process.env.NEXT_PUBLIC_COLLATERAL_RATIO || "0",
  );
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n);
  const [isAllowanceEnough, setIsAllowanceEnough] = useState<boolean>(false);
  const [isDepositValid, setIsDepositValid] = useState<boolean>(false);
  const [isMintValid, setIsMintValid] = useState<boolean>(false);

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const debouncedDepositAmount = useDebounce(depositAmount, 500);
  const debouncedMintAmount = useDebounce(mintAmount, 500);

  const makeDeposit = () => {};

  const setDepositToMax = () => {
    if (activeVault) {
      const maxDepositAmount = formatUnits(tokenBalance, activeVault.token.decimals);
      setDepositAmount(maxDepositAmount);
    }
  };

  const setMintToMax = () => {
    const collateralRatioProportion = parseFloat(collateralRatio) / 100;
    const mintAmount = (parseFloat(depositAmount) * 1500) / collateralRatioProportion;
    setMintAmount(mintAmount.toString());
  };

  const debtRatioStateChanger = (isAuto: boolean) => {
    setIsDebtRatioAuto(isAuto);
    setCollateralRatio(process.env.NEXT_PUBLIC_COLLATERAL_RATIO || "0");
  };

  const handleDepositInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setDepositAmount(value);
  };

  const handleMintInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setMintAmount(value);
  };

  const handleCollateralRatioChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setCollateralRatio(value);
  };

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
    if (address && depositAmount && activeVault) {
      allowance(tokenAddress, ownerAddress, spenderAddress).then((result) => {
        // console.log("allowance: ", result);
        // setTokenAllowance(result);

        if (result >= parseUnits(depositAmount, activeVault.token.decimals)) {
          setIsAllowanceEnough(true);
        } else {
          setIsAllowanceEnough(false);
        }
      });
    }
  };

  const getTokenApproved = async (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
  ) => {
    if (address && depositAmount) {
      await approve(tokenAddress, spenderAddress, amount).then((tx) => {
        fetchTokenAllowance(tokenAddress, address, spenderAddress);
      });
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
      const sharesAmount = await convertYieldTokensToShares(troveManagerAddress, amount);
      console.log("sharesAmount: ", sharesAmount);

      // Step#2
      const NCIR = await computeNominalCR(
        multiCollateralHintHelpersAddress,
        sharesAmount,
        parseUnits(mintAmount, activeVault.token.decimals),
      );
      console.log("NCIR: ", NCIR);

      // Step#3
      const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
      console.log("troveOwnersCount: ", troveOwnersCount);

      // Step#4
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

      // Step#5
      const insertPosition = await findInsertPosition(
        sortedTrovesAddress,
        NCIR,
        approxHint[0],
        approxHint[0],
      );
      console.log("insertPosition: ", insertPosition);

      // Step#6
      const tx = await openTrove(
        borrowerOperationsAddress,
        troveManagerAddress,
        address,
        0n,
        parseUnits(depositAmount, activeVault.token.decimals),
        parseUnits(mintAmount, activeVault.token.decimals),
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

      if (isAllowanceEnough) {
        getTokenMinted(
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
    let isValid = false;
    const amount = parseFloat(depositAmount);
    if (amount > 0 && amount <= parseFloat(formatUnits(tokenBalance, activeVault.token.decimals))) {
      isValid = true;
    }

    setIsDepositValid(isValid);
  };

  const validateMint = () => {
    let isValid = false;

    const collateralRatioProportion = parseFloat(collateralRatio) / 100;
    const maxMintAmount = (parseFloat(depositAmount) * 1500) / collateralRatioProportion;

    const amount = parseFloat(mintAmount);
    if (amount > 0 && amount <= maxMintAmount) {
      isValid = true;
    }

    setIsMintValid(isValid);
  };

  useEffect(() => {
    validateDeposit();

    if (isDebtRatioAuto) {
      setMintToMax();
    }

    if (address && chain && activeVault) {
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      fetchTokenAllowance(activeVault.token.address, address, borrowerOperationsAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDepositAmount, isDebtRatioAuto]);

  useEffect(() => {
    validateMint();
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

        <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
          <input
            type="number"
            placeholder={`1.000 ${activeVault?.token.symbol}`}
            value={depositAmount}
            onChange={handleDepositInputChange}
            className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
          />
          <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
            <button type="button" onClick={setDepositToMax} className="font-bold">
              Max
            </button>
          </div>
        </div>
      </div>

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
          <p className="text-primaryColor">129% -{">"} 240%</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p>Placeholder information</p>
          <p>Add more as needed</p>
        </div>
      </div>
      <div>
        <ButtonStyle1
          disabled={false}
          action={async () => {
            makeDeposit();
          }}
          text="Deposit"
        />
      </div>
    </div>
  );
};

export default DepositPosition;
