import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Stats = () => {
  // Sample data - replace with data from backend
  const totalTrades = 25;
  const winRate = 60; // in percent
  const avgRR = 1.8;
  const bestSession = 'New York';

  const winLossData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [winRate, 100 - winRate],
        backgroundColor: ['#22c55e', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#dc2626'],
        borderColor: '#4b5563',
      },
    ],
  };

  const sessionPerformanceData = {
    labels: ['London', 'New York', 'Asian'],
    datasets: [
        {
            label: 'Number of Trades',
            data: [10, 15, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }
    ]
  };
  
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'white'
        },
         grid: {
          color: '#4b5563'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: '#4b5563'
        }
      }
    }
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Performance Stats</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Total Trades</p>
          <p className="text-3xl font-bold">{totalTrades}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Win Rate</p>
          <p className="text-3xl font-bold text-green-500">{winRate}%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Average R:R</p>
          <p className="text-3xl font-bold">{avgRR}:1</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-sm text-gray-400">Best Session</p>
          <p className="text-3xl font-bold">{bestSession}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Win/Loss Distribution</h2>
          <div className="w-full h-64 flex justify-center">
            <Pie data={winLossData} options={{ maintainAspectRatio: false, plugins:{legend:{labels:{color:'white'}}} }} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Session Performance</h2>
           <div className="w-full h-64 flex justify-center">
            <Bar data={sessionPerformanceData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;