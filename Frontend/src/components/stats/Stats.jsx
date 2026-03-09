import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { getStats } from '../../services/api';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getStats();
        setStats(fetchedStats.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center">Loading stats...</p>;
  }

  if (error) {
    return <p className="text-center error-message">{error}</p>;
  }

  if (!stats) {
    return <p className="text-center">No stats available.</p>;
  }

  const {
    totalTrades,
    winRate,
    avgRR,
    bestSession,
    winLossData,
    sessionPerformance,
  } = stats;

  const winLossChartData = {
    labels: ['Wins', 'Losses', 'BE'],
    datasets: [
      {
        data: [winLossData.wins, winLossData.losses, winLossData.be],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
        hoverBackgroundColor: ['#218838', '#c82333', '#e0a800'],
        borderColor: '#1a1a1a',
      },
    ],
  };

  const sessionPerformanceChartData = {
    labels: Object.keys(sessionPerformance),
    datasets: [
      {
        label: 'Number of Trades',
        data: Object.values(sessionPerformance),
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'var(--text-color)',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'var(--secondary-color)',
        },
      },
      x: {
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'var(--secondary-color)',
        },
      },
    },
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Performance Stats</h1>

      <div className="dashboard-grid mb-8">
        <div className="dashboard-card text-center">
          <p className="text-sm">Total Trades</p>
          <p className="stat">{totalTrades}</p>
        </div>
        <div className="dashboard-card text-center">
          <p className="text-sm">Win Rate</p>
          <p className="stat profit">{winRate}%</p>
        </div>
        <div className="dashboard-card text-center">
          <p className="text-sm">Average R:R</p>
          <p className="stat">{avgRR}:1</p>
        </div>
        <div className="dashboard-card text-center">
          <p className="text-sm">Best Session</p>
          <p className="stat">{bestSession}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Win/Loss Distribution
          </h2>
          <div className="w-full h-64 flex justify-center">
            <Pie
              data={winLossChartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: 'var(--text-color)' } },
                },
              }}
            />
          </div>
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Session Performance
          </h2>
          <div className="w-full h-64 flex justify-center">
            <Bar data={sessionPerformanceChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
