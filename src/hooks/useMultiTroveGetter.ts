import { useCallback } from "react";

import { type Address } from "viem";
import { readContract } from "viem/actions";
import { useAccount } from "wagmi";

import MultiTroveGetter_ABI from "@/abis/MultiTroveGetter.json";
import { wagmiConfig } from "@/wagmi";

const publicClient = wagmiConfig.getClient();



export const useMultiTroveGetter = (): {
    getMultipleSortedTroves: (troveManagerAddress: Address, count: bigint) => Promise<[[]]>;
} => {
    const { isConnected, address } = useAccount();
    const getMultipleSortedTroves = useCallback(
        async (troveManagerAddress: Address, count: bigint): Promise<[[]]> => {
            try {
                if (isConnected && address && publicClient && troveManagerAddress) {
                    const startIdx = -1
                    const troves = await readContract(publicClient, {
                        abi: MultiTroveGetter_ABI.abi,
                        account: address,
                        address: troveManagerAddress,
                        functionName: "getMultipleSortedTroves",
                        args: [troveManagerAddress,startIdx,count],
                    });

                    return troves as [[]];
                } else {
                    return [[]];
                }
            } catch (error) {
                console.log("getMultipleSortedTroves(): ", error);
                return [[]];
            }
        },
        [isConnected, address],
    );


    return {
        getMultipleSortedTroves
    };
};

export default useMultiTroveGetter;
