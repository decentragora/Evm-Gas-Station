'use client'
import React, { useState, useEffect, use } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { clients } from '@/provider/providers'
import { Loading, NetworkSelector, Estimate, GasGraph, MissingGraph } from '@/components'
import { Clients, GasData } from '@/types/Types'
import { formatGwei } from 'viem'
import { useNativeCurrency, useCurrencyLink } from '@/hooks'
import { HiOutlineExternalLink } from 'react-icons/hi'


export default function Home() {
  const [gasData, setGasData] = useState<GasData>({
    homestead: { currentGwei: 0 },
    matic: { currentGwei: 0 },
    optimism: { currentGwei: 0 },
    arbitrum: { currentGwei: 0 },
    base: { currentGwei: 0 },
    avalanche: { currentGwei: 0 },
    metis: { currentGwei: 0 },
    bsc: { currentGwei: 0 },
    linea: { currentGwei: 0 },
    filecoin: { currentGwei: 0 },
    gnosis: { currentGwei: 0 },
    scroll: { currentGwei: 0 },
    fantom: { currentGwei: 0 },
    zkSync: { currentGwei: 0 },
    celo: { currentGwei: 0 },
    moonbeam: { currentGwei: 0 },
  });
  const [feeHistory, setFeeHistory] = useState<any>({});
  const [selectedClient, setSelectedClient] = useState('homestead');
  const [isLoading, setIsLoading] = useState(true);
  const NativeCurrencyPrice: number = useNativeCurrency(selectedClient) || 0;
  const coinGeckoLink = useCurrencyLink(selectedClient);


  const FetchData = async () => {
    const [gasData, feeHistory] = await Promise.all([
      FetchClientsCurrentGwei(),
      FetchFeeHistory()
    ]);
    setIsLoading(false);
  }

  const FetchClientsCurrentGwei = async () => {
    const promises = Object.keys(clients).map(async (client) => {
      const data = await clients[client].getGasPrice();
      if (client === 'metis' || client === 'celo' || client === 'scroll') return { data, maxPriorityFeePerGas: BigInt(0) };
      const maxPriorityFeePerGas = await clients[client].estimateMaxPriorityFeePerGas();
      return { data, maxPriorityFeePerGas }
    });
    const data = await Promise.all(promises);
    const formattedData = data.reduce((acc: GasData, curr, index) => {
      const name = Object.keys(clients)[index];
      acc[name as keyof GasData] = {
        currentGwei: Number(formatGwei(curr.data)),
        rawGwei: curr.data,
        maxPriorityFeePerGas: Number(formatGwei(curr.maxPriorityFeePerGas)),
        rawMaxPriorityFeePerGas: curr.maxPriorityFeePerGas
      };
      return acc;
    }, {} as GasData);
    setGasData(formattedData);
    return formattedData;
  }

  const FetchFeeHistory = async () => {
    const promises = Object.keys(clients).map(async (client) => {
      if (client === 'metis' || client === 'celo' || client === 'scroll') return null;
      const data: any = await clients[client].getFeeHistory({
        blockCount: 50,
        rewardPercentiles: [1, 50, 99]
      }).catch((err: Error) => {
        console.error(err);
      })
      return data;
    });
    const data = await Promise.all(promises);
    const formattedData = data.reduce((acc, curr, index) => {
      // dont add metis and other clients that dont have fee history 
      if (curr === null) return acc;
      const name = Object.keys(clients)[index];
      if (curr && curr.baseFeePerGas) {
        curr.baseFeePerGas = curr.baseFeePerGas.filter((x: any) => x !== null); // or replace null with a default value
      }
      acc[name] = curr;
      return acc;
    }, {});
    setFeeHistory(formattedData);
    return formattedData;
  }

  useEffect(() => {
    // Fetch data initially
    FetchData().then(() => {
      const intervalId = setInterval(async () => {
        await FetchData();
      }, 12000);

      return () => clearInterval(intervalId);
    });
  }, []);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.client_selector_container}>
          <div className={styles.client_selector}>
            <div className={styles.client_info_container}>
              <div className={styles.client_info}>
                <span className={styles.label}>Selected Network:</span>
                <span className={styles.value}>{selectedClient === "homestead" ? "Ethereum Mainnet" : selectedClient}</span>
              </div>
              <div className={styles.client_info}>
                <span className={styles.label}>Native Currency Price:</span>
                <span className={styles.value_price}>
                  $ {NativeCurrencyPrice ? NativeCurrencyPrice.toFixed(2) : "..."} 
                  <a href={coinGeckoLink} target="_blank" rel="noreferrer">
                    <span className={styles.link_icon}>
                      <HiOutlineExternalLink />
                    </span>
                  </a>
                </span>
              </div>
            </div>
            <NetworkSelector
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              gasData={gasData}
              isLoading={isLoading}
            />
          </div>
          <div className={styles.graph_and_estimate_container}>
            <div className={styles.graph_container}>
              {!feeHistory[selectedClient] ? <MissingGraph /> :
                <GasGraph
                  selectedClient={selectedClient}
                  feeHistory={feeHistory}
                />}
            </div>
            <div className={styles.estimate_container}>
              <Estimate
                selectedClient={selectedClient}
                gasData={gasData}
                nativeCurrencyPrice={NativeCurrencyPrice}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
