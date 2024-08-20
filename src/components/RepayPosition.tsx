"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import { useRouter } from "next/navigation";
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
import type { VaultType } from "@/types";


interface RepayPositionProps {
    activeVault: VaultType | undefined;
}
const RepayPosition: React.FC<RepayPositionProps> = ({ activeVault }) => {
    const { chain, address } = useAccount();
    const { getTroveOwnersCount, getTroveCollSharesAndDebt, convertSharesToYieldTokens } =
        useTroveManager();
    const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
    const { findInsertPosition } = useSortedTroves();
    const { repayDebt, closeTrove } = useBorrowerOperations();
    const dispatch = useDispatch()
    const [repayAmount, setRepayAmount] = useState<string>("0");
    const router = useRouter()
    const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";

    const debouncedRepayAmount = useDebounce(repayAmount, 350);
    const [isValidated, setIsValidated] = useState(true);
    const [alreadyMintedDebt, setAlreadyMintedDebt] = useState(0n);
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");

    const handleRepayInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setRepayAmount(value);
    };
    const setRepayToMax = () => {
        if (activeVault) {
            console.log("alreadyMintedDebt.toString() :", alreadyMintedDebt.toString());
            setRepayAmount(formatUnits(alreadyMintedDebt, activeVault.token.decimals));
        }
    };

    const closePosition = async (
        borrowerOperationsAddress: Address,
        troveManagerAddress: Address,
        address: Address,

    ) => {
        if (address && activeVault) {
            // Step#1
            const tx = await closeTrove(borrowerOperationsAddress, troveManagerAddress, address)
            console.log("tx: ", tx);
            if (tx?.status === "success") {
                setTimeout(() => {
                    router.push('/positions')
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

                dispatch(setLoader({ condition: "loading", text1: 'Repaying', text2: `${formatUnits(amount, activeVault.token.decimals)} GREEN` }))
            }
            if (address && activeVault) {
                // Step#1
                const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);
                console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);

                // Step#2
                console.log("Repay Amount", parseUnits(debouncedRepayAmount, activeVault.token.decimals));
                const userDebt =
                    troveCollSharesAndDebt[1] - parseUnits(debouncedRepayAmount, activeVault.token.decimals);
                console.log("userDebt", userDebt);

                // Step # 3
                const NCIR = await computeNominalCR(
                    multiCollateralHintHelpersAddress,
                    troveCollSharesAndDebt[0],
                    userDebt,
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
                const tx = await repayDebt(
                    borrowerOperationsAddress,
                    troveManagerAddress,
                    address,
                    amount,
                    insertPosition[0],
                    insertPosition[1],
                );
                console.log("tx: ", tx);

                setRepayAmount("0")
            }
        } catch (error) {
            if (activeVault) {
                dispatch(setLoader({ condition: "failed", text1: 'Repaying', text2: `${formatUnits(amount, activeVault.token.decimals)} GREEN` }))
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
            const deboundedInBigInt = parseUnits(debouncedRepayAmount, activeVault.token.decimals)
            if (deboundedInBigInt === alreadyMintedDebt) {
                closePosition(
                    borrowerOperationsAddress,
                    troveManagerAddress,
                    address
                )
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
    useEffect(() => {
        const getAlreadyMintedDebt = async () => {
            if (address && chain && activeVault) {
                const troveManagerAddress: Address =
                    CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
                        .TROVE_MANAGER;
                const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(
                    troveManagerAddress,
                    address,
                );
                console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);
                const mintedTokens = await convertSharesToYieldTokens(
                    troveManagerAddress,
                    troveCollSharesAndDebt[1],
                );
                console.log("mintedTokens :", mintedTokens);
                setAlreadyMintedDebt(mintedTokens);
            }
        };
        getAlreadyMintedDebt();
    }, [address, chain, activeVault]);

    useEffect(() => {
        const getValidate = async () => {
            if (address && chain && activeVault && debouncedRepayAmount !== "0") {
                const repayAmountLocal = parseUnits(debouncedRepayAmount, activeVault.token.decimals);
                if (repayAmountLocal < 0n) {
                    setIsValidated(false);
                    setError("Your desired Repay amount should be greater than 0");
                } else if (repayAmountLocal > alreadyMintedDebt) {
                    setIsValidated(false);
                    setError("Your desired Repay amount is greater than Minted token");
                    setWarning("");
                } else if (repayAmountLocal === alreadyMintedDebt) {
                    setWarning(
                        "Your desired Repay amount is equal to Minted token, Your position will be closed if you proceed",
                    );
                    setIsValidated(true);
                    setError("");
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
        };
        getValidate();
    }, [debouncedRepayAmount, address, activeVault]);

    return (
        <div className="flex flex-col gap-12 pt-12">
            <div className="flex flex-col gap-2">
                <p className="font-medium text-[12px] leading-[24px]">Repay GREEN</p>
                <div
                    className={`${!isValidated ? "border-[#FF5710]" : warning ? "border-[#ffd025]" : "border-transparent"}  border mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center`}
                >
                    <input
                        value={repayAmount}
                        onChange={handleRepayInputChange}
                        type="number"
                        placeholder="100 GREEN"
                        className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                    />
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                        <button onClick={setRepayToMax} className="font-bold">
                            Max
                        </button>
                    </div>
                </div>
                <div className="h-[20px] flex items-center">
                    {error && <p className="text-[#FF5710]">{error}</p>}
                    {warning && <p className="text-[#ffd025]">{warning}</p>}
                </div>
            </div>
            <div className="text-[12px] text-lightGray font-medium leading-[24px]">
                <div className="flex items-center justify-between gap-3">
                    <p>Collateral ratio change</p>
                    <p className="text-primaryColor">129% -{">"} 140%</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <p>Placeholder information</p>
                    <p>Add more as needed</p>
                </div>
            </div>
            <div>
                <ButtonStyle1 disabled={!isValidated || repayAmount === "0"} action={handleCtaFunctions} text="Repay" />
            </div>
        </div>
    );
};

export default RepayPosition;
