import React from 'react';
import styles from './gasGraph.module.css';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Legend, Tooltip, Title, SubTitle, Colors, plugins } from 'chart.js';
import { formatGwei } from 'viem';
import '@fontsource-variable/space-grotesk';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Legend, Tooltip, Title, SubTitle, Colors, plugins);
Chart.defaults.font.family = 'sans-serif';
Chart.defaults.color = '#fff';
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';

Chart.defaults.plugins.tooltip.titleColor = '#fff';
Chart.defaults.plugins.tooltip.bodyColor = '#fff';
Chart.defaults.plugins.tooltip.borderColor = '#fff';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.titleAlign = 'center';
Chart.defaults.plugins.tooltip.bodyAlign = 'center';
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.padding = 8;

Chart.defaults.plugins.legend.display = true;
Chart.defaults.plugins.legend.position = 'top';
Chart.defaults.plugins.legend.align = 'center';
Chart.defaults.plugins.legend.labels.color = '#fff';
Chart.defaults.plugins.legend.labels.boxWidth = 20;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 8;

Chart.defaults.plugins.subtitle.display = true;
Chart.defaults.plugins.subtitle.color = '#fff';
Chart.defaults.plugins.subtitle.padding = 8;
Chart.defaults.plugins.subtitle.font = {
  family: 'sans-serif',
  size: 14,
};

function GasGraph({ selectedClient, feeHistory }: { selectedClient: string; feeHistory: any }) {
  Chart.defaults.plugins.subtitle.text = `Client: ${selectedClient === 'homestead' ? 'Ethereum Mainnet' : selectedClient.charAt(0).toUpperCase() + selectedClient.slice(1)}`;
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
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Gas Used Ratio',
        data: gasUsedRatio,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'max Priority Fee (Gwei)',
        data: reward,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    labels: {
      color: '#fff',
    },
    
    scales: {
      x: {
        styles: {
          minHeight: 500,
          color: '#fff',
        },
        title: {
          display: true,
          text: 'Block',
          color: '#fff',
          font: {
            family: 'sans-serif',
            size: 16,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#fff',
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
            family: 'sans-serif',
            size: 16,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#fff',
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
