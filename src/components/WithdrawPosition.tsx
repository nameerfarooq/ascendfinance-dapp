"use client";
import React, { useEffect, useState, type ChangeEvent } from "react";

import { parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
// import useERC20Contract from "@/hooks/useERC20Contract";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import type { VaultType } from "@/types";

import ButtonStyle1 from "./Buttons/ButtonStyle1";


interface WithdrawPositionProps {
    activeVault: VaultType | undefined;
}
const WithdrawPosition: React.FC<WithdrawPositionProps> = ({ activeVault }) => {
    const { isConnected, chain, address } = useAccount();
    // const { balanceOf } = useERC20Contract();
    const { convertYieldTokensToShares, convertSharesToYieldTokens, getTroveOwnersCount, getTroveCollSharesAndDebt } =
        useTroveManager();
    const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
    const { findInsertPosition } = useSortedTroves();
    const { withdrawColl } = useBorrowerOperations();


    const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";

    const handleWithdrawInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setwithdrawAmount(value);
    };

    const [withdrawAmount, setwithdrawAmount] = useState("");

    const setInputValueMax = () => {
        setwithdrawAmount("0");
    };


    const getTokenWithdrawed = async (
        troveManagerAddress: Address,
        multiCollateralHintHelpersAddress: Address,
        sortedTrovesAddress: Address,
        borrowerOperationsAddress: Address,
        amount: bigint,
    ) => {
        if (address && activeVault) {
            console.log("amount :", amount)
            // Step#1
            const sharesAmount = await convertYieldTokensToShares(troveManagerAddress, amount);
            console.log("sharesAmount: ", sharesAmount);

            // Step#2
            const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);
            console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);

            // // Step#3
            const totalShares = troveCollSharesAndDebt[0] - sharesAmount;
            console.log("totalShares: ", totalShares);

            // // Step # 4
            const NCIR = await computeNominalCR(
                multiCollateralHintHelpersAddress,
                totalShares,
                troveCollSharesAndDebt[1],
            );
            console.log("NCIR: ", NCIR);

            // // Step#5
            const troveOwnersCount = await getTroveOwnersCount(troveManagerAddress);
            console.log("troveOwnersCount: ", troveOwnersCount);

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
                parseUnits(withdrawAmount, activeVault.token.decimals),
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

            //   if (isAllowanceEnough) {
            getTokenWithdrawed(
                troveManagerAddress,
                multiCollateralHintHelpersAddress,
                sortedTrovesAddress,
                borrowerOperationsAddress,
                parseUnits(withdrawAmount, activeVault.token.decimals),
            );
            //   } 
        } else {
            console.log("wallet not connected.");
        }
    };
    // useEffect(() => {
    //     const getValidate = async () => {
    //         if (address && chain && activeVault) {
    //             const troveManagerAddress: Address =
    //             CONTRACT_ADDRESSES[appBuildEnvironment][chain?.id].troves[activeVault.token.address]
    //             .TROVE_MANAGER;
    //             const troveCollSharesAndDebt = await getTroveCollSharesAndDebt(troveManagerAddress, address);
    //             console.log("troveCollSharesAndDebt: ", troveCollSharesAndDebt);
    //             const depositedTokens = await convertSharesToYieldTokens(troveManagerAddress, troveCollSharesAndDebt[0])
    //             console.log("depositedTokens: ", depositedTokens);
    //         }
    //     }
    //     getValidate()

    // }, [address,activeVault,chain])
    return (
        <div className="flex flex-col gap-12 pt-12">
            <div className="flex flex-col gap-2">
                <p className="font-medium text-[12px] leading-[24px]">Withdraw weETH</p>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                    <input
                        value={withdrawAmount}
                        onChange={handleWithdrawInputChange}
                        type="number"
                        placeholder="0.29 weETH"
                        className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                    />
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                        <button onClick={setInputValueMax} className="font-bold">
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
                    disabled={!isConnected}
                    action={handleCtaFunctions}
                    text="Withdraw"
                />
            </div>
        </div>
    );
};

export default WithdrawPosition;
