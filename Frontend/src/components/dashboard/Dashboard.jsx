import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Sample data - replace with data from backend
  const dailyData = {
    market: 'Forex',
    session: 'New York',
    bias: 'Bullish',
    trades: 3,
    wins: 2,
    losses: 1,
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{today}</h1>
        <div className="flex space-x-2">
          <Link
            to="/daily-marking"
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            &#x2795; Add Daily Marking
          </Link>
          <Link
            to="/trade-journal"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            &#x2795; Add Trade
          </Link>
          <Link
            to="/journal-history"
            className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            &#x1F4CA; View Journal
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Overview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Market</p>
              <p className="text-lg font-semibold">{dailyData.market}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Session</p>
              <p className="text-lg font-semibold">{dailyData.session}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Daily Bias</p>
              <p className="text-lg font-semibold">{dailyData.bias}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Trades</p>
              <p className="text-lg font-semibold">{dailyData.trades}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-400">Win / Loss</p>
              <p className="text-lg font-semibold">
                <span className="text-green-500">{dailyData.wins}W</span> /{' '}
                <span className="text-red-500">{dailyData.losses}L</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;