"use client";
import React, { useEffect, useState } from "react";
import { OptimismGasOracle, ArbitrumGasOracle } from "@/contracts";
import { CommonTransactions } from "@/data/transactions";
import styles from "./estimate.module.css";
import { formatEther, formatGwei } from "viem";
import { EstimatedTransaction, EstimatedTransactionsArray } from "@/types/Types";
import { clients } from "@/provider/providers";

function Estimate({ selectedClient, gasData, nativeCurrencyPrice, }: { selectedClient: string; gasData: any; nativeCurrencyPrice: number; }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [estimatedTransactions, setEstimatedTransactions] = useState<EstimatedTransactionsArray>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [customGasInputs, setCustomGasInputs] = useState<EstimatedTransaction>({
    name: "Custom Input",
    avgGasUsed: 69420,
    estimatedCostInEth: 0,
    estimatedCostInUsd: 0,
  });

  const HandleCustomGasInputChange = (value: string) => {
    if (Number(value) > 30000000) value = "30000000";
    setCustomGasInputs({
      ...customGasInputs,
      avgGasUsed: Number(value),
    });
  }

  const HandleEstimation = async () => {
    const estimatedTransactions: EstimatedTransactionsArray = [];
    let l1DataFee: any = 0;
    for (const transaction of CommonTransactions) {
      if (transaction.forNetwork && transaction.forNetwork !== selectedClient && transaction.forNetwork !== "all") continue;
      const exampleData = transaction.exampleData;
      if (selectedClient === "optimism") {
        l1DataFee = await EstimateOptimsimL1DataFees(exampleData);
      } else if (selectedClient === "arbitrum") {
        l1DataFee = await EstimateArbitrumL1DataFees(exampleData);
      } else if (selectedClient === "base") {
        l1DataFee = await EstimateBaseL1DataFees(exampleData);
      }

      const totalGasUsed = BigInt(transaction.avgGasUsed);
      const _estimatedCostInEth = Number(
        formatEther(
          totalGasUsed * (BigInt(gasData[selectedClient].rawGwei) + gasData[selectedClient].rawMaxPriorityFeePerGas)
        )
      );
      const estimatedCostInEth = Number(_estimatedCostInEth) + Number(l1DataFee);

      estimatedTransactions.push({
        name: transaction.name,
        avgGasUsed: transaction.avgGasUsed,
        estimatedCostInEth: estimatedCostInEth,
        estimatedCostInUsd: estimatedCostInEth * nativeCurrencyPrice,
      });
    }

    setEstimatedTransactions(estimatedTransactions);
    setIsLoading(false);
  }

  const EstimateOptimsimL1DataFees = async (exampleData: string) => {
    const opGasOracleAddress = "0x420000000000000000000000000000000000000F";
    try {
      const l1DataFee: any = await clients.optimism.readContract({
        address: opGasOracleAddress,
        abi: OptimismGasOracle,
        functionName: "getL1Fee",
        args: [exampleData]
      });
      const l1DataFeeInGwei = formatEther(l1DataFee);
      return l1DataFeeInGwei;
    } catch (error) {
      console.error(error);
    }
  }

  const EstimateBaseL1DataFees = async (exampleData: string) => {
    const baseGasOracleAddress = "0x420000000000000000000000000000000000000F";
    try {
      const l1DataFee: any = await clients.optimism.readContract({
        address: baseGasOracleAddress,
        abi: OptimismGasOracle,
        functionName: "getL1Fee",
        args: [exampleData]
      });
      const l1DataFeeInGwei = formatEther(l1DataFee);
      return l1DataFeeInGwei;
    } catch (error) {
      console.error(error);
    }
  }

  const EstimateArbitrumL1DataFees = async (exampleData: string) => {
    const arbGasOracleAddress = "0x000000000000000000000000000000000000006C";
    try {
      const l1DataFee: any = await clients.arbitrum.readContract({
        address: arbGasOracleAddress,
        abi: ArbitrumGasOracle,
        functionName: "getL1BaseFeeEstimate",
      });
      const l1DataFeeInGwei = formatEther(l1DataFee);
      return l1DataFeeInGwei;
    } catch (error) {
      console.error(error);
    }
  }

  const HandleSorting = (columnName: string) => {
    // Toggle sorting direction if the same column is clicked again
    if (columnName === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const SortTransactions = () => {
    let sortedTransactions = [...estimatedTransactions];

    if (sortColumn === "name") {
      sortedTransactions.sort((a, b) => {
        if (sortDirection === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else {
      const columnKey =
        sortColumn === "avgGasUsed" ? "avgGasUsed" : "estimatedCostInUsd";

      sortedTransactions.sort((a, b) => {
        if (sortDirection === "asc") {
          return a[columnKey] - b[columnKey];
        } else {
          return b[columnKey] - a[columnKey];
        }
      });
    }

    return sortedTransactions;
  };

  const EstimateCustomGas = async () => {
    let l1DataFee: any = 0;
    const exampleData = "0x";
    if (selectedClient === "optimism") {
      l1DataFee = await EstimateOptimsimL1DataFees(exampleData);
    } else if (selectedClient === "arbitrum") {
      l1DataFee = await EstimateArbitrumL1DataFees(exampleData);
    } else if (selectedClient === "base") {
      l1DataFee = await EstimateBaseL1DataFees(exampleData);
    }

    const totalGasUsed = BigInt(customGasInputs.avgGasUsed);
    const _estimatedCostInEth = Number(
      formatEther(
        totalGasUsed * (BigInt(gasData[selectedClient].rawGwei) + gasData[selectedClient].rawMaxPriorityFeePerGas)
      )
    );
    const estimatedCostInEth = Number(_estimatedCostInEth) + Number(l1DataFee);
    setCustomGasInputs({
      ...customGasInputs,
      estimatedCostInEth: estimatedCostInEth,
      estimatedCostInUsd: estimatedCostInEth * nativeCurrencyPrice,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    HandleEstimation();
  }, [selectedClient, gasData, nativeCurrencyPrice]);

  useEffect(() => {
    EstimateCustomGas();
  }, [customGasInputs.avgGasUsed, selectedClient, nativeCurrencyPrice]);

  const sortedTransactions = SortTransactions();

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr className={styles.table_row}>
            <th colSpan={4} onClick={() => HandleSorting("name")}>
              Name{" "}
              {sortColumn === "name" && (sortDirection === "asc" ? "▼" : "▲")}
            </th>
            <th
              className={styles.table_header_cell}
              onClick={() => HandleSorting("avgGasUsed")}
            >
              Avg Gas Used{" "}
              {sortColumn === "avgGasUsed" &&
                (sortDirection === "asc" ? "▼" : "▲")}
            </th>
            <th
              className={styles.table_header_cell}
              onClick={() => HandleSorting("estimatedCostInEth")}
            >
              Estimated Cost In {selectedClient === "bsc"
                ? "BNB"
                : selectedClient === "matic"
                  ? "MATIC"
                  : selectedClient === "avalanche"
                    ? "AVAX"
                    : selectedClient === "metis"
                      ? "METIS"
                      : selectedClient === "filecoin"
                        ? "FIL"
                        : selectedClient === "gnosis"
                          ? "XDAI"
                          : selectedClient === "fantom"
                            ? "FTM"
                            : selectedClient === "moonbeam"
                              ? "GLMR"
                              : selectedClient === "celo"
                                ? "CELO"
                                : "ETH"}{" "}
              {sortColumn === "estimatedCostInEth" &&
                (sortDirection === "asc" ? "▼" : "▲")}
            </th>
            <th
              className={styles.table_header_cell}
              onClick={() => HandleSorting("estimatedCostInUsd")}
            >
              Estimated Cost In Usd{" "}
              {sortColumn === "estimatedCostInUsd" &&
                (sortDirection === "asc" ? "▼" : "▲")}
            </th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          <td className={styles.table_cell} colSpan={4}>
            <p className={styles.custom_input_title}>Custom Gas Input</p>
          </td>
          <td className={styles.table_cell}>
            <input
              className={styles.custom_input}
              type="number"
              accept="number"
              about="Custom Gas Input"
              max="30000000"
              onChange={(e) => HandleCustomGasInputChange(e.target.value)}
              onBlur={(e) => HandleCustomGasInputChange(e.target.value)}
              value={customGasInputs.avgGasUsed}
            />
          </td>
          <td className={styles.table_cell}>
            {!isLoading ? customGasInputs.estimatedCostInEth.toFixed(4)
              : "..."}{" "}
            {selectedClient === "bsc"
              ? "BNB"
              : selectedClient === "matic"
                ? "MATIC"
                : selectedClient === "avalanche"
                  ? "AVAX"
                  : selectedClient === "metis"
                    ? "METIS"
                    : selectedClient === "filecoin"
                      ? "FIL"
                      : selectedClient === "gnosis"
                        ? "XDAI"
                        : selectedClient === "fantom"
                          ? "FTM"
                          : selectedClient === "moonbeam"
                            ? "GLMR"
                            : selectedClient === "celo"
                              ? "CELO"
                              : "ETH"}
          </td>
          <td className={styles.table_cell}>
            {!isLoading ? (customGasInputs.estimatedCostInUsd > 0.01
              ? customGasInputs.estimatedCostInUsd.toFixed(2)
              : customGasInputs.estimatedCostInUsd.toFixed(4))
              : "..."}{" "}
            USD
          </td>

          {sortedTransactions.map((transaction, index) => (
            <tr key={index} className={styles.table_row}>
              <td className={styles.table_cell} colSpan={4}>
                {transaction.name}
              </td>
              <td className={styles.table_cell}>
                {transaction.avgGasUsed} gwei
              </td>
              <td className={styles.table_cell}>
                {!isLoading ? transaction.estimatedCostInEth.toFixed(4)
                  : "..."}{" "}
                {selectedClient === "bsc"
                  ? "BNB"
                  : selectedClient === "matic"
                    ? "MATIC"
                    : selectedClient === "avalanche"
                      ? "AVAX"
                      : selectedClient === "metis"
                        ? "METIS"
                        : selectedClient === "filecoin"
                          ? "FIL"
                          : selectedClient === "gnosis"
                            ? "XDAI"
                            : selectedClient === "fantom"
                              ? "FTM"
                              : selectedClient === "moonbeam"
                                ? "GLMR"
                                : selectedClient === "celo"
                                  ? "CELO"
                                  : "ETH"}
              </td>
              <td className={styles.table_cell}>
                {!isLoading ? (transaction.estimatedCostInUsd > 0.01
                  ? transaction.estimatedCostInUsd.toFixed(2)
                  : transaction.estimatedCostInUsd.toFixed(4))
                  : "..."}{" "}
                USD
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Estimate;
