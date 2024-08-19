'use client'

import { useState, type ChangeEvent } from "react";

import { parseUnits, type Address } from "viem";
import { useAccount } from "wagmi";

import ButtonStyle1 from "@/components/Buttons/ButtonStyle1";
import { CONTRACT_ADDRESSES } from "@/constants/contracts";
import useBorrowerOperations from "@/hooks/useBorrowerOperations";
import useMultiCollateralHintHelpers from "@/hooks/useMultiCollateralHintHelpers";
import useSortedTroves from "@/hooks/useSortedTroves";
import useTroveManager from "@/hooks/useTroveManager";
import type { VaultType } from "@/types";

interface RepayPositionProps {
    activeVault: VaultType | undefined;
}
const RepayPosition: React.FC<RepayPositionProps> = ({ activeVault }) => {

    const { chain, address } = useAccount();
    const { getTroveOwnersCount, getTroveCollSharesAndDebt } =
        useTroveManager();
    const { computeNominalCR, getApproxHint } = useMultiCollateralHintHelpers();
    const { findInsertPosition } = useSortedTroves();
    const { repayDebt } = useBorrowerOperations();

    const [repayAmount, setRepayAmount] = useState<string>("0");

    const appBuildEnvironment = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD" ? "PROD" : "DEV";






    const handleRepayInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setRepayAmount(value);
    };
    const setRepayToMax = () => {
        if (activeVault) {
            setRepayAmount("0");
        }
    };


    const getTokenRepayed = async (
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
            console.log("Repay Amount", parseUnits(repayAmount, activeVault.token.decimals))
            const userDebt = troveCollSharesAndDebt[1] - parseUnits(repayAmount, activeVault.token.decimals)
            console.log("userDebt", userDebt)


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

            getTokenRepayed(
                troveManagerAddress,
                multiCollateralHintHelpersAddress,
                sortedTrovesAddress,
                borrowerOperationsAddress,
                parseUnits(repayAmount, activeVault.token.decimals),
            );
        } else {
            console.log("wallet not connected.");
        }
    };






    return (
        <div className="flex flex-col gap-12 pt-12">
            <div className='flex flex-col gap-2'>
                <p className='font-medium text-[12px] leading-[24px]'>Repay GREEN</p>
                <div className=" mt-3 rounded-2xl bg-secondaryColor py-4 px-4 sm:px-8 text-lightGray flex justify-between gap-2 items-center">
                    <input
                        value={repayAmount}
                        onChange={handleRepayInputChange}
                        type="number"
                        placeholder="100 GREEN"
                        className="bg-transparent placeholder:text-lightGray text-white outline-none border-none font-medium text-[16px] sm:text-[18px] leading-[36px] w-[120px] sm:w-auto"
                    />
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-28 font-medium text-[12px] sm:text-[14px] leading-[28px]">
                        <button onClick={setRepayToMax} className="font-bold">Max</button>
                    </div>
                </div>
            </div>
            <div className="text-[12px] text-lightGray font-medium leading-[24px]">
                <div className="flex items-center justify-between gap-3">
                    <p>Collateral ratio change</p>
                    <p className='text-primaryColor'>129% -{'>'} 140%</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <p>Placeholder information</p>
                    <p>Add more as needed</p>
                </div>
            </div>
            <div>
                <ButtonStyle1 disabled={repayAmount <= "0"} action={handleCtaFunctions} text='Repay' />
            </div>
        </div>
    )
}

export default RepayPosition
