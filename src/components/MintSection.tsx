"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { formatUnits, parseUnits, type Address } from "viem";
// import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

// import ERC20_ABI from "@/abis/ERC20.json";
import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useMultiTroveGetter from "@/hooks/useMultiTroveGetter";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { setLoader } from "@/lib/features/loader/loaderSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatDecimals } from "@/utils/formatters";
// import { wagmiConfig } from "@/wagmi";

import goBackIcon from "../../public/icons/goBackIcon.svg";
import mintIcon from "../../public/icons/mintIcon.svg";
interface MintSectionProps {
  handleShowMintSection: () => void;
}

interface StatsType {
  vaultPosition: number;
  vaultCount: number;
  debtInFront: bigint;
  collateralRatio: bigint;
  liquidationPrice: bigint;
  remainingMintableGreen: bigint;
}

const MintSection: React.FC<MintSectionProps> = ({ handleShowMintSection }) => {
  const activeVault = useAppSelector((state) => state.vault.activeVault);
  const priceInUSD = useAppSelector((state) => state.protocol.priceInUSD);
  const latestBlockNumber = useAppSelector((state) => state.protocol.latestBlockNumber);
  const { isRecoveryMode, isPaused } = useAppSelector((state) => state.protocol.protocol);
  const {
    isVMPaused,
    isSunSetting,
    maxSystemDebt,
    defaultedDebt,
    totalActiveDebt,
    MCR_value,
    troveOwnersCount,
  } = useAppSelector((state) => state.protocol.trove);
  const { minNetDebt, CCR_value, globalSystemBalances } = useAppSelector(
    (state) => state.protocol.borrowerOp,
  );
  // const { multipleSortedTroves } = useAppSelector((state) => state.protocol.multiTrove);

  const dispatch = useDispatch();
  const { isConnected, chain, address } = useAccount();
  const { balanceOf, allowance, approve } = useERC20Contract();
  const { convertYieldTokensToShares } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { openTrove } = useBorrowerOperations();
  const { getMultipleSortedTroves } = useMultiTroveGetter();

  const [showVaults, setshowVaults] = useState<boolean>(false);
  const [zap, setZap] = useState<0 | 1 | 2>(0);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [mintAmount, setMintAmount] = useState<string>("");
  const [isDebtRatioAuto, setIsDebtRatioAuto] = useState<boolean>(true);
  const [collateralRatio, setCollateralRatio] = useState<bigint>(
    BigInt(process.env.NEXT_PUBLIC_COLLATERAL_RATIO || "0"),
  );
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n);
  const [isAllowanceEnough, setIsAllowanceEnough] = useState<boolean>(false);
  const [isDepositValid, setIsDepositValid] = useState<boolean>(false);
  const [depositerror, setDepositError] = useState<string>("");
  const [isMintValid, setIsMintValid] = useState<boolean>(false);
  const [minterror, setMintError] = useState<string>("");
  // const [tokenPrice_USD, setTokenPrice_USD] = useState<bigint>(0n);
  const [stats, setStats] = useState<StatsType>({
    vaultPosition: 0,
    vaultCount: 0,
    debtInFront: 0n,
    collateralRatio: 0n,
    liquidationPrice: 0n,
    remainingMintableGreen: 0n,
  });

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  const debouncedDepositAmount = useDebounce(depositAmount, 350);
  const debouncedMintAmount = useDebounce(mintAmount, 350);
  const debouncedCollateralRatio = useDebounce(collateralRatio, 350);

  const handleShowVaults = () => {
    setshowVaults(!showVaults);
  };

  const setDepositToMax = () => {
    const maxDepositAmount = formatUnits(tokenBalance, activeVault.token.decimals);
    setDepositAmount(maxDepositAmount);
  };

  const setMintToMax = () => {
    if (collateralRatio > 0) {
      const collateralRatioProportion = collateralRatio / 100n;
      const mintAmount =
        (parseUnits(depositAmount, activeVault.token.decimals) * BigInt(priceInUSD)) /
        collateralRatioProportion;

      setMintAmount(formatUnits(mintAmount, 18));
    } else {
      setMintAmount("0");
    }
  };

  const debtRatioStateChanger = (isAuto: boolean) => {
    setIsDebtRatioAuto(isAuto);
    setCollateralRatio(BigInt(process.env.NEXT_PUBLIC_COLLATERAL_RATIO || "0"));
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

    setCollateralRatio(parseUnits(value, 18));
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
    if (address && depositAmount) {
      allowance(tokenAddress, ownerAddress, spenderAddress).then((result) => {
        console.log("fetchTokenAllowance()");
        console.log("tokenAddress: ", tokenAddress);
        console.log("ownerAddress: ", address);
        console.log("spenderAddress: ", spenderAddress);
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

  const getTokenApproved = async (
    tokenAddress: Address,
    spenderAddress: Address,
    amount: bigint,
  ) => {
    if (address && depositAmount) {
      console.log("getTokenApproved()");
      console.log("tokenAddress: ", tokenAddress);
      console.log("spenderAddress: ", spenderAddress);
      console.log("amount: ", amount);

      await approve(tokenAddress, spenderAddress, amount).then((tx) => {
        if (tx?.status === "success") {
          fetchTokenAllowance(tokenAddress, address, spenderAddress);
        }
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
    try {
      if (address) {
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
        const NCIR = await computeNominalCR(
          multiCollateralHintHelpersAddress,
          sharesAmount,
          parseUnits(mintAmount, 18),
        );
        console.log("NCIR: ", NCIR);

        // Step#3
        // const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
        // console.log("troveOwnersCount: ", troveOwnersCount);

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
          parseUnits(mintAmount, 18),
          insertPosition[0],
          insertPosition[1],
        );
        console.log("tx: ", tx);
        if (tx?.status === "success") {
          dispatch(
            setLoader({
              condition: "failed",
              text1: "Depositing",
              text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
            }),
          );
        } else {
          dispatch(
            setLoader({
              condition: "failed",
              text1: "Depositing",
              text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
            }),
          );
        }

        // Step#7
        fetchTokenbalance(activeVault.token.address, address);
      }
    } catch (error) {
      dispatch(
        setLoader({
          condition: "failed",
          text1: "Depositing",
          text2: `${formatUnits(amount, activeVault.token.decimals)} ${activeVault.token.symbol}`,
        }),
      );
    }
  };

  const handleCtaFunctions = () => {
    if (address && chain) {
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
    if (isPaused || isVMPaused || isSunSetting) {
      setIsDepositValid(false);
      return;
    }

    const amount = parseUnits(depositAmount, activeVault.token.decimals);

    if (depositAmount === "") {
      setDepositError("");
      setIsDepositValid(false);
    } else if (parseFloat(depositAmount) <= 0) {
      setIsDepositValid(false);
      setDepositError("Deposit amount must be greater than 0");
    } else if (amount > 0n && amount <= tokenBalance) {
      setIsDepositValid(true);
      setDepositError("");
    } else if (amount > 0n && amount > tokenBalance) {
      setIsDepositValid(false);
      setDepositError("Deposit amount is greater than token balance");
    }
  };

  const validateMint = () => {
    try {
      const userCollAmount = parseUnits(depositAmount, activeVault.token.decimals);
      const userDebtAmount = parseUnits(mintAmount, 18);
      const newTotalDebt = BigInt(globalSystemBalances.totalDebt) + userDebtAmount;
      const newTotalPricedColl =
        BigInt(globalSystemBalances.totalPricedCollateral) + userCollAmount * BigInt(priceInUSD);
      const newTCR = newTotalPricedColl / newTotalDebt;

      const userICR = collateralRatio / 100n;
      const isICR_invalid = userICR < BigInt(CCR_value);
      const isMCR_invalid = userICR < BigInt(MCR_value);
      const isTCR_invalid = newTCR < BigInt(CCR_value);

      if (isRecoveryMode && isICR_invalid) {
        setIsMintValid(false);
        setMintError("Collateral ratio should be above CCR");
        return;
      } else if (!isRecoveryMode && isMCR_invalid) {
        setIsMintValid(false);
        setMintError("Collateral ratio should be above MCR");
        return;
      } else if (!isRecoveryMode && isTCR_invalid) {
        setIsMintValid(false);
        setMintError("Your Position will cause the GTCR to drop below CCR");
        return;
      }

      if (isPaused || isVMPaused || isSunSetting) {
        setIsMintValid(false);
        return;
      }

      let maxMintAmount = 0n;

      if (collateralRatio > 0n) {
        const collateralRatioProportion = collateralRatio / 100n;

        maxMintAmount =
          (parseUnits(depositAmount, activeVault.token.decimals) * BigInt(priceInUSD)) /
          collateralRatioProportion;
      }

      const amount = parseUnits(mintAmount, 18);

      if (mintAmount === "") {
        setMintError("");
        setIsMintValid(false);
      } else if (parseFloat(mintAmount) <= 0) {
        setIsMintValid(false);
        setMintError("Desired mint value must be greater than 0");
      } else if (amount > 0n && amount > maxMintAmount) {
        if (isDebtRatioAuto) {
          setIsMintValid(false);
          setMintError("Desired mint value is greater than tokens available for mint");
        }
      } else if (amount < BigInt(minNetDebt)) {
        setIsMintValid(false);
        setMintError(
          `User must have a min debt of ${formatDecimals(parseFloat(formatUnits(BigInt(minNetDebt), 18)), 2)}`,
        );
      } else if (BigInt(totalActiveDebt) + BigInt(defaultedDebt) + amount > BigInt(maxSystemDebt)) {
        setIsMintValid(false);
        setMintError("Collateral debt limit reached");
      } else if (amount > 0n && amount <= maxMintAmount) {
        setIsMintValid(true);
        setMintError("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    if (
      !depositAmount ||
      !mintAmount ||
      parseFloat(depositAmount) <= 0 ||
      parseFloat(mintAmount) <= 0
    ) {
      setStats({
        vaultPosition: 0,
        vaultCount: 0,
        debtInFront: 0n,
        collateralRatio: 0n,
        liquidationPrice: 0n,
        remainingMintableGreen: 0n,
      });
    } else if (
      isConnected &&
      address &&
      chain &&
      activeVault &&
      depositAmount &&
      mintAmount &&
      priceInUSD
    ) {
      const troveManagerAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
          .TROVE_MANAGER;
      const multiCollateralHintHelpersAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].MULTI_COLLATERAL_HINT_HELPERS;
      const multiTroveGetterAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].MULTI_TROVE_GETTER;

      const amount = parseUnits(depositAmount, activeVault.token.decimals);
      const userCollAmount = parseUnits(depositAmount, activeVault.token.decimals);
      const userDebtAmount = parseUnits(mintAmount, 18);

      // 1)
      const sharesAmount = await convertYieldTokensToShares(troveManagerAddress, amount);

      // 2)
      const NCIR = await computeNominalCR(
        multiCollateralHintHelpersAddress,
        sharesAmount,
        parseUnits(mintAmount, 18),
      );

      // 3)
      // const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);

      // 4)
      const multipleSortedTroves = await getMultipleSortedTroves(
        multiTroveGetterAddress,
        troveManagerAddress,
        -1,
        BigInt(troveOwnersCount),
      );

      let debtBefore = 0n;
      let position = multipleSortedTroves.length - 1;
      // 5)
      if (multipleSortedTroves.length) {
        for (let i = 0; i < multipleSortedTroves.length; i++) {
          // Calculate NICR of current owner
          const currentOwnerNICR =
            (multipleSortedTroves[i].coll * 100000000000000000000n) / multipleSortedTroves[i].debt;

          // Compare userNICR with currentOwnerNICR
          if (NCIR < currentOwnerNICR) {
            position = i;
            break;
          }
          debtBefore += multipleSortedTroves[i].debt;
        }
      }

      // 6)
      const liquidationPrice = (BigInt(MCR_value) * userDebtAmount) / userCollAmount;

      // 7)
      const remainingMintableGreen =
        BigInt(maxSystemDebt) - BigInt(totalActiveDebt) - BigInt(defaultedDebt);

      setStats({
        vaultPosition: position,
        vaultCount: Number(troveOwnersCount),
        debtInFront: debtBefore,
        collateralRatio: collateralRatio,
        liquidationPrice: liquidationPrice,
        remainingMintableGreen: remainingMintableGreen,
      });
    }
  };

  useEffect(() => {
    validateDeposit();

    if (debouncedDepositAmount === "") {
      setMintAmount("");
    } else {
      setMintToMax();
    }

    if (address && chain) {
      const borrowerOperationsAddress: Address =
        CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].BORROWER_OPERATIONS;
      fetchTokenAllowance(activeVault.token.address, address, borrowerOperationsAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDepositAmount, isDebtRatioAuto]);

  useEffect(() => {
    // Auto Mode: Set Mint Value & Set Validate Deposit
    if (isDebtRatioAuto) {
      if (debouncedDepositAmount === "") {
        setMintAmount("");
      } else {
        setMintToMax();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCollateralRatio]);

  useEffect(() => {
    validateMint();

    // Custom Mode: Set Mint Value
    if (!isDebtRatioAuto) {
      let collateralRatioPercentage = 0n;

      if (parseUnits(mintAmount, 18) > 0) {
        collateralRatioPercentage =
          ((BigInt(priceInUSD) * parseUnits(depositAmount, activeVault.token.decimals)) /
            parseUnits(mintAmount, 18)) *
          100n;
      }

      setCollateralRatio(collateralRatioPercentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMintAmount]);

  useEffect(() => {
    if (address && chain && activeVault) {
      // const troveManagerAddress: Address =
      //   CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
      //     .TROVE_MANAGER;

      fetchTokenbalance(activeVault.token.address, address);
      // fetchPriceInUsd(troveManagerAddress).then((priceInUSD) => {
      //   setTokenPrice_USD(priceInUSD);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, activeVault.token]);

  useEffect(() => {
    if (isConnected && address && chain) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestBlockNumber, debouncedMintAmount]);

  // const publicClient = wagmiConfig.getClient();

  // const publicClient = usePublicClient()

  useEffect(() => {
    if (!isConnected) {
      setStats({
        vaultPosition: 0,
        vaultCount: 0,
        debtInFront: 0n,
        collateralRatio: 0n,
        liquidationPrice: 0n,
        remainingMintableGreen: 0n,
      });
    }

    // console.log("Hello")

    // publicClient?.readContract({
    //   abi: ERC20_ABI,
    //   address: "0xF0F058e935a2a43F72840F8146FE505D8E0d782D",
    //   functionName: "allowance",
    //   args: [
    //     "0x432daa56f1aBDE1dC160eb86DAf236511a130BEF",
    //     "0x28e8D20D1155875e19f1F48Ca56b7B9a2DB49bFB",
    //   ],
    // }).then((allowance) => {
    //   console.log("AllowanceNew: ", allowance);
    // });
  }, [isConnected]);

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="relative bg-baseColor shadowCustom rounded-3xl w-[90%] mt-[50px] md:mt-10px sm:w-[80%] md:w-[70%] lg:w-[55%]  xl:w-[48%]">
        <div
          onClick={handleShowMintSection}
          className="static w-max mx-5 my-2 lg:absolute -left-[115px] shadow-xl top-0 rounded-full p-5 sm:p-10 bg-secondaryColor lg:bg-baseColor cursor-pointer hover:bg-primaryColor"
        >
          <Image
            src={goBackIcon}
            alt="Go back Icon"
            className="w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] object-contain"
          />
        </div>

        <div className="pt-6 pb-10 px-12">
          <div className="flex items-center gap-6">
            <Image alt="Mint icon" src={mintIcon} width={30} className="brightness-0 invert" />
            <p className="font-bold leading-[60px] text-[30px] text-white">Mint GREEN</p>
          </div>

          <p className="text-[14px] leading-[24px]">
            To mint (borrow) GREEN, you are required to deposit a specific amount of collateral
            using the Ascend platform, or have a pre-existing balance of ETH or stETH within the
            Ascend Protocol. You can then generate GREEN against your collateral up to a maximum
            collateral ratio of 170%.
          </p>
        </div>

        <hr className="border-lightGray2" />

        <div className="flex flex-col gap-6 px-6 sm:px-12 py-14">
          <div className="flex justify-between gap-4 flex-wrap sm:flex-nowrap">
            <div
              onClick={handleShowVaults}
              className="flex flex-col gap-3 w-10/12 sm:w-4/12 cursor-pointer relative"
            >
              <p className="font-medium text-[12px] leading-[24px]">Vault</p>
              <div className="flex gap-6 items-center">
                <Image src={activeVault?.token?.logoURI || ""} alt="icon" width={55} />
                <div className="flex flex-col gap-0">
                  <p className="font-bold text-[24px] leading-[28px]">
                    {activeVault?.token?.symbol || ""}
                  </p>
                  <p className="font-medium text-[12px] leading-[24px]">
                    {activeVault?.token?.name || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-10/12 sm:w-5/12 cursor-pointer relative">
              <p className="font-medium text-[12px] leading-[24px]">Zap</p>
              <div className="rounded-2xl bg-secondaryColor flex items-center sm:mt-3">
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

          <div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-[12px] leading-[24px]">Deposit</p>
              <p className="font-medium text-[12px] leading-[24px]">
                Wallet:{" "}
                <span className="font-extrabold">
                  {formatDecimals(Number(formatUnits(tokenBalance, activeVault.token.decimals)), 2)}
                </span>{" "}
                {activeVault.token.symbol}
              </p>
            </div>

            <div
              className={`${depositAmount !== "" && depositerror ? "border-[#FF5710]" : "border-transparent"} border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
            >
              <input
                type="number"
                placeholder={`1.000 ${activeVault.token.symbol}`}
                value={depositAmount}
                onChange={handleDepositInputChange}
                className="bg-transparent placeholder:text-lightGray outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
              />
              <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                <p>= $0.00</p>
                <button type="button" onClick={setDepositToMax} className="font-bold">
                  Max
                </button>
              </div>
            </div>

            {depositAmount !== "" && depositerror && (
              <p className="text-[#FF5710] mt-4 text-[12px]">{depositerror}</p>
            )}
          </div>

          <div
            className={`${zap > 0 ? "h-[90px] sm:h-[60px] opacity-100" : "h-0 overflow-hidden opacity-0"} smooth-transition flex flex-col gap-3 font-medium text-lightGray text-[12px] leading-[24px]`}
          >
            <div className="flex justify-between sm:items-center flex-col sm:flex-row">
              <p>Exchange rate</p>
              <p>(1,16495) 1.00 ETH to 0.85 weETH</p>
            </div>

            <div className="flex justify-between sm:items-center flex-col sm:flex-row">
              <p>Your total collateral</p>
              <p>
                {" "}
                <span className="font-bold text-white"> 0.85 weETH </span>= $3 929.00{" "}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-2 mt-6 border-primaryColor py-8 px-4 sm:px-8 flex flex-col gap-6 font-medium text-[12px] leading-[24px]">
            <div>
              <p>Debt</p>
              <div className="flex justify-between items-center">
                <div className="rounded-2xl bg-secondaryColor flex items-center w-[160px]">
                  <div
                    onClick={() => debtRatioStateChanger(true)}
                    className={`${isDebtRatioAuto && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                  >
                    Auto
                  </div>
                  <div
                    onClick={() => debtRatioStateChanger(false)}
                    className={`${!isDebtRatioAuto && "bg-lightGray text-white"} font-medium text-[12px] leading-[24px] cursor-pointer text-lightGray rounded-2xl p-2 text-center flex-1 items-center justify-center`}
                  >
                    Custom
                  </div>
                </div>

                <div className="bg-secondaryColor outline-none  rounded-2xl w-[130px] sm:w-[150px] flex justify-center items-center text-white text-center">
                  <input
                    type="number"
                    value={isDebtRatioAuto ? formatUnits(collateralRatio, 18) : "0"}
                    disabled={!isDebtRatioAuto}
                    onChange={handleCollateralRatioChange}
                    className="bg-transparent outline-none  w-[80px] py-2 px-6 text-white text-center"
                  />
                  <p>%</p>
                </div>
              </div>
            </div>

            <div>
              <p>Mint</p>

              <div
                className={`${mintAmount !== "" && minterror ? "border-[#FF5710]" : "border-transparent"} border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
              >
                <input
                  type="number"
                  placeholder="1.000 GREEN"
                  value={mintAmount}
                  disabled={isDebtRatioAuto}
                  onChange={handleMintInputChange}
                  className="placeholder:text-lightGray bg-transparent outline-none border-none font-medium text-[14px] sm:text-[18px] leading-[36px] w-[130px] sm:w-auto flex-grow"
                />
              </div>
              {mintAmount !== "" && minterror && <p className="text-[#FF5710] mt-4">{minterror}</p>}
            </div>
          </div>

          {(isPaused || isVMPaused || isSunSetting) && (
            <div className="my-5 flex items-center justify-center rounded-lg p-4 border bg-[#ff4c0036] border-[#FF5710] text-[14px] text-[#FF5710]">
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

          <div className="flex gap-4">
            <ButtonStyle1
              disabled={!isConnected || isAllowanceEnough || !isDepositValid}
              text={`Approve ${activeVault.token.symbol}`}
              action={handleCtaFunctions}
            />

            <ButtonStyle1
              disabled={!isConnected || !isAllowanceEnough || !isDepositValid || !isMintValid}
              text={"Deposit"}
              action={handleCtaFunctions}
            />
          </div>
        </div>

        <hr className="border-lightGray2" />

        <div className="flex flex-col gap-1 py-8 px-6 sm:px-12 font-medium text-lightGray text-[12px] leading-[24px]">
          <p className="text-white font-bold">Additional Info</p>
          <div className="flex items-center justify-between gap-2">
            <p>Vault position</p>
            <p>
              {stats.vaultPosition}/{stats.vaultCount}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Debt in front</p>
            <p>{formatDecimals(parseFloat(formatUnits(stats.debtInFront, 18)), 2)} GREEN</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Collateral Ratio</p>
            <p className="text-primaryColor">
              {formatDecimals(parseFloat(formatUnits(stats.collateralRatio, 18)), 2)}%
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Liquidation Price</p>
            <p className="text-primaryColor">
              ${formatDecimals(parseFloat(formatUnits(stats.liquidationPrice, 18)), 2)}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Remaining Mintable GREEN</p>
            <p>{formatDecimals(parseFloat(formatUnits(stats.remainingMintableGreen, 18)), 2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintSection;
