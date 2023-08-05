import { useWeb3Contract, useMoralis } from "react-moralis"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useNotification, Button } from "web3uikit"

import { contractAddresses, abi } from "../constants"

export default function Main() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const accountableContractAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [mintFee, setMintFee] = useState(0)
    const [mintFeeUSD, setMintFeeUSD] = useState(0)

    const dispatch = useNotification()

    const {
        runContractFunction: formUriAndMint,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: accountableContractAddress,
        functionName: "mint",
        params: {},
        msgValue: mintFee,
    })

    const { runContractFunction: getMintFee } = useWeb3Contract({
        abi: abi,
        contractAddress: accountableContractAddress,
        functionName: "getMintFee",
        params: {},
    })

    const { runContractFunction: getEthPriceFromUsd } = useWeb3Contract({
        abi: abi,
        contractAddress: accountableContractAddress,
        functionName: "getEthPriceFromUsd",
        params: {},
    })

    async function updateUI() {
        const fee = (await getMintFee()).toString()
        const ethPrice = (await getEthPriceFromUsd()).toString()
        setMintFeeUSD(fee)
        setMintFee(ethPrice)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            // updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            title: "Tx notification",
            message: "Your transaction complete ",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async function () {
                        await formUriAndMint({
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error),
                        })
                    }}
                    disabled={isLoading || isFetching}
                >
                    {isLoading || isFetching ? (
                        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                    ) : (
                        <div>Create Agreement</div>
                    )}
                </button>
                {accountableContractAddress ? (
                    <div>
                        {" "}
                        {ethers.utils.formatUnits(mintFeeUSD, "ether")} USD ≈{" "}
                        {ethers.utils.formatUnits(mintFee, "ether")} ETH
                    </div>
                ) : (
                    <div>No contract address for this chain</div>
                )}
            </div>
        </div>
    )
}
