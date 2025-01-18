import { createPublicClient } from "viem";

export type Clients = {
    homestead?: ReturnType<typeof createPublicClient>
    matic?: ReturnType<typeof createPublicClient>
    optimism?: ReturnType<typeof createPublicClient>
    arbitrum?: ReturnType<typeof createPublicClient>
    base?: ReturnType<typeof createPublicClient>
    avalanche?: ReturnType<typeof createPublicClient>
    metis?: ReturnType<typeof createPublicClient>
    bsc?: ReturnType<typeof createPublicClient>
    linea?: ReturnType<typeof createPublicClient>
    filecoin?: ReturnType<typeof createPublicClient>
    gnosis?: ReturnType<typeof createPublicClient>
    scroll?: ReturnType<typeof createPublicClient>
    zkSync?: ReturnType<typeof createPublicClient>
    celo?: ReturnType<typeof createPublicClient>
    moonbeam?: ReturnType<typeof createPublicClient>
}

export type Client = keyof Clients;

export type GasData = {
    [key in Client]: {
        currentGwei: number,
        rawGwei?: string,
        maxPriorityFeePerGas?: number | null,
        rawMaxPriorityFeePerGas?: string | null
    }
}

export type EstimatedTransaction = {
    name: string,
    avgGasUsed: number,
    estimatedCostInEth: number,
    estimatedCostInUsd: number
}

export type EstimatedTransactionsArray = EstimatedTransaction[]