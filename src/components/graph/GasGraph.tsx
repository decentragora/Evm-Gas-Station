import React from 'react';
import styles from './gasGraph.module.css';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Legend, Tooltip, Title, SubTitle } from 'chart.js';
import { formatGwei } from 'viem';
import '@fontsource-variable/space-grotesk';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Legend, Tooltip, Title, SubTitle);

function GasGraph({ selectedClient, feeHistory }: { selectedClient: string; feeHistory: any }) {
  const historicalBlocks = 50;
  const graphData = feeHistory[selectedClient]; 
  if(selectedClient === 'metis') return null;
  if (!graphData) return null;
  
  function formatFeeHistory(graphData: any) {
    let blockNum = Number(graphData.oldestBlock);
    let index = 0;
    const blocks = [];
    while (blockNum < Number(graphData.oldestBlock) + historicalBlocks) {
      blocks.push({
        number: blockNum,
        baseFeePerGas: (graphData.baseFeePerGas[index] ? graphData.baseFeePerGas[index] : 0),
        gasUsedRatio: Number(graphData.gasUsedRatio[index] ? graphData.gasUsedRatio[index] : 0),
        priorityFeePerGas: graphData.reward[index] ? graphData.reward[index].map((x: any) => Number(x)) : [0, 0, 0],
      });
      blockNum += 1;
      index += 1;
    }
    return blocks;
  }

  const formattedData = formatFeeHistory(graphData);
  const labels = formattedData.map(block => block.number);
  const baseFeePerGas = formattedData.map(block => formatGwei(block.baseFeePerGas));
  const gasUsedRatio = formattedData.map(block => block.gasUsedRatio);
  const reward = formattedData.map(block => formatGwei(block.priorityFeePerGas[1]));


  const data: any = {
    labels: labels,
    datasets: [
      {
        label: 'Base Fee (Gwei)',
        data: baseFeePerGas,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Gas Used Ratio',
        data: gasUsedRatio,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'maxPriorityFeePerGas (Gwei)',
        data: reward,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        styles: {
          minHeight: 500,
        },
        title: {
          display: true,
          text: 'Block',
          color: '#fff',
          font: {
            family: 'Space Grotesk',
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        styles: {
          minHeight: 500,
        },
        title: {
          display: true,
          text: 'Value',
          color: '#fff',
          font: {
            family: 'Space Grotesk',
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: 'Space Grotesk',
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Space Grotesk',
          size: 14,
        },
      },
    },
  };


  return (
    <div className={styles.gasGraphContainer}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GasGraph;
