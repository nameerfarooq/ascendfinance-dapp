"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { formatUnits, parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
// import vaultsList from "@/constants/vaults";
import { useDebounce } from "@/hooks";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import { setLoader } from "@/lib/features/loader/loaderSlice";
// import { setActiveVault } from "@/lib/features/vault/vaultSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
// import type { VaultType } from "@/types";
// import { getDefaultChainId } from "@/utils/chain";

import goBackIcon from "../../public/icons/goBackIcon.svg";
import mintIcon from "../../public/icons/mintIcon.svg";
interface MintSectionProps {
  handleShowMintSection: () => void;
}
const MintSection: React.FC<MintSectionProps> = ({ handleShowMintSection }) => {
  const { isConnected, chain, address } = useAccount();
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const activeVault = useAppSelector((state) => state.vault.activeVault);
  const { balanceOf, allowance, approve } = useERC20Contract();
  const { convertYieldTokensToShares, getTroveOwnersCount } = useTroveManager();
  const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
  const { findInsertPosition } = useSortedTroves();
  const { openTrove } = useBorrowerOperations();

  const [showVaults, setshowVaults] = useState<boolean>(false);
  const [zap, setZap] = useState<0 | 1 | 2>(0);
  const [depositAmount, setDepositAmount] = useState<string>("0");
  const [mintAmount, setMintAmount] = useState<string>("0");
  const [isDebtRatioAuto, setIsDebtRatioAuto] = useState<boolean>(true);
  const [collateralRatio, setCollateralRatio] = useState<string>(
    process.env.NEXT_PUBLIC_COLLATERAL_RATIO || "0",
  );
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n);
  // const [tokenAllowance, setTokenAllowance] = useState<bigint>(0n);
  const [isAllowanceEnough, setIsAllowanceEnough] = useState<boolean>(false);
  const [isDepositValid, setIsDepositValid] = useState<boolean>(false);
  const [isMintValid, setIsMintValid] = useState<boolean>(false);

  const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";
  // const nativeVaultsList = vaultsList[appBuildEnvironment];
  // const defaultChainId = getDefaultChainId(chain);
  const debouncedDepositAmount = useDebounce(depositAmount, 500);
  const debouncedMintAmount = useDebounce(mintAmount, 500);

  const handleShowVaults = () => {
    setshowVaults(!showVaults);
  };

  const setLoaderTrue = async (loading: boolean, text1: string, text2: string) => {
    dispatch(
      setLoader({
        loading,
        text1,
        text2,
      }),
    );
  };

  // const setActiveVaultFunc = (vault: VaultType) => {
  //   dispatch(setActiveVault(vault));
  // };

  const setDepositToMax = () => {
    const maxDepositAmount = formatUnits(tokenBalance, activeVault.token.decimals);
    setDepositAmount(maxDepositAmount);
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
    if (address && depositAmount) {
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
      setLoaderTrue(true, "Approval Pending", depositAmount);

      await approve(tokenAddress, spenderAddress, amount).then((tx) => {
        if (tx?.status === "success") {
          setLoaderTrue(true, "Approval Success", depositAmount);
          setTimeout(() => {
            setLoaderTrue(false, "", "");
          }, 1500);
        }
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
    if (address) {
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

    if (address && chain) {
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
    if (address) {
      fetchTokenbalance(activeVault.token.address, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, chain, activeVault.token]);

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
            <p className="font-bold leading-[60px] text-[30px] text-white">Mint BLUE</p>
          </div>

          <p className="text-[14px] leading-[24px]">
            To mint (borrow) BLUE, you are required to deposit a specific amount of collateral using
            the Ascend platform, or have a pre-existing balance of ETH or stETH within the Ascend
            Protocol. You can then generate BLUE against your collateral up to a maximum collateral
            ratio of 170%.
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
              {/* <div className="rounded-2xl bg-secondaryColor py-3 px-5 sm:px-8 flex justify-between gap-2 items-center">
                <div className="flex items-center gap-3">
                  <Image src={activeVault?.token?.logoURI || ""} width={30} alt="token icon" />
                  <p className="font-bold text-[18px] leading-[36px]">
                    {activeVault?.token?.symbol || ""}
                  </p>
                </div>
                {showVaults ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
              </div> */}
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
              {/* {showVaults && (
                <div className="absolute z-30 bg-secondaryColor top-[90px] left-0 w-full border rounded-2xl border-[#647594]">
                  {Object.keys(nativeVaultsList[defaultChainId]).map((vaultId) => (
                    <Fragment key={vaultId}>
                      <div
                        onClick={() =>
                          setActiveVaultFunc(nativeVaultsList[defaultChainId][vaultId])
                        }
                        className="flex items-center py-2 px-8 gap-3 rounded-2xl hover:bg-primaryColor"
                      >
                        <Image
                          src={nativeVaultsList[defaultChainId][vaultId].token.logoURI}
                          width={30}
                          alt="token icon"
                        />
                        <p className="font-bold text-[18px] leading-[36px]">
                          {nativeVaultsList[defaultChainId][vaultId].token.symbol}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )} */}
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
                  {formatUnits(tokenBalance, activeVault.token.decimals)}
                </span>{" "}
                {activeVault.token.symbol}
              </p>
            </div>

            <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
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
                    value={collateralRatio}
                    disabled={isDebtRatioAuto}
                    onChange={handleCollateralRatioChange}
                    className="bg-transparent outline-none  w-[80px] py-2 px-6 text-white text-center"
                  />
                  <p>%</p>
                </div>
              </div>
            </div>

            <div>
              <p>Mint</p>

              <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                <input
                  type="number"
                  placeholder="1.000 weETH"
                  value={mintAmount}
                  onChange={handleMintInputChange}
                  className="placeholder:text-lightGray bg-transparent outline-none border-none font-medium text-[14px] sm:text-[18px] leading-[36px] w-[130px] sm:w-auto"
                />
                <div className="flex items-center gap-28 font-medium text-[14px] leading-[28px]">
                  <button type="button" onClick={setMintToMax} className="font-bold text-lightGray">
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
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
            <p>1/14</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Debt in front</p>
            <p>0.0 BLUE</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Collateral Ratio</p>
            <p className="text-primaryColor">130%</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Liquidation Price</p>
            <p className="text-primaryColor">$ 4100.34</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p>Remaining Mintable BLUE</p>
            <p>93,999,999.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintSection;
