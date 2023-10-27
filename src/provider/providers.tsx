"use client"
import { createPublicClient, http } from "viem"
import { mainnet, polygon, optimism, base, arbitrum, avalanche, metis, bsc, linea, celo, filecoin, gnosis, fantom, scroll, canto, cronos, zkSync, eos, moonbeam, mantle, telos, zora, syscoin, } from "viem/chains"
import { Client, Clients } from "@/types/Types"

const InfuraTransports = {
    homestead: http(`https://mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    matic: http(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    optimism: http(`https://optimism-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    arbitrum: http(`https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    avalanche: http(`https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    linea: http(`https://linea-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
    celo: http(`https://celo-mainnet.infura.io/v3/${process.env.INFURA_ID || ""}`),
}

const AnkrTransports = {
    base: http(`https://rpc.ankr.com/base/${process.env.ANKR_ID || ""}`),
    bsc: http(`https://rpc.ankr.com/bsc/${process.env.ANKR_ID || ""}`),
    gnosis: http(`https://rpc.ankr.com/gnosis/${process.env.ANKR_ID || ""}`),
    filecoin: http(`https://rpc.ankr.com/filecoin/${process.env.ANKR_ID || ""}`),
    fantom: http(`https://rpc.ankr.com/fantom/${process.env.ANKR_ID || ""}`),
    scroll: http(`https://rpc.ankr.com/scroll/${process.env.ANKR_ID || ""}`),
    zkSync: http(`https://rpc.ankr.com/zksync_era/${process.env.ANKR_ID || ""}`),
}

export const clients: Clients | any = {
    homestead: createPublicClient({
        chain: mainnet,
        transport: InfuraTransports.homestead,
    }),

    matic: createPublicClient({
        chain: polygon,
        transport: InfuraTransports.matic,
    }),

    optimism: createPublicClient({
        chain: optimism,
        transport: InfuraTransports.optimism,
    }),

    arbitrum: createPublicClient({
        chain: arbitrum,
        transport: InfuraTransports.arbitrum,
    }),

    base: createPublicClient({
        chain: base,
        transport: AnkrTransports.base,
    }),

    avalanche: createPublicClient({
        chain: avalanche,
        transport: InfuraTransports.avalanche,
    }),

    metis: createPublicClient({
        chain: metis,
        transport: http(),
    }),

    bsc: createPublicClient({
        chain: bsc,
        transport: http(),
    }),

    linea: createPublicClient({
        chain: linea,
        transport: InfuraTransports.linea,
    }),

    filecoin: createPublicClient({
        chain: filecoin,
        transport: AnkrTransports.filecoin,
    }),

    gnosis: createPublicClient({
        chain: gnosis,
        transport: AnkrTransports.gnosis,
    }),

    scroll: createPublicClient({
        chain: scroll,
        transport: AnkrTransports.scroll,
    }),

    fantom: createPublicClient({
        chain: fantom,
        transport: AnkrTransports.fantom,
    }),

    zkSync: createPublicClient({
        chain: zkSync,
        transport: AnkrTransports.zkSync,
    }),

    celo: createPublicClient({
        chain: celo,
        transport: http(),
    }),

    moonbeam: createPublicClient({
        chain: moonbeam,
        transport: http(),
    }),
}


