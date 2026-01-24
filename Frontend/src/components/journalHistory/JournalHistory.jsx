import React, { useState } from 'react';

const sampleTrades = [
  {
    id: 1,
    date: '2023-10-26',
    pair: 'EURUSD',
    session: 'New York',
    direction: 'Buy',
    result: 'Win',
    rr: 2.5,
  },
  {
    id: 2,
    date: '2023-10-26',
    pair: 'GBPUSD',
    session: 'New York',
    direction: 'Sell',
    result: 'Loss',
    rr: -1,
  },
  {
    id: 3,
    date: '2023-10-25',
    pair: 'EURUSD',
    session: 'London',
    direction: 'Sell',
    result: 'Win',
    rr: 3,
  },
    {
    id: 4,
    date: '2023-10-24',
    pair: 'NAS100',
    session: 'New York',
    direction: 'Buy',
    result: 'BE',
    rr: 0,
  },
];

const JournalHistory = () => {
  const [filters, setFilters] = useState({
    date: '',
    pair: '',
    session: '',
    result: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTrades = sampleTrades.filter((trade) => {
    return (
      (filters.date ? trade.date === filters.date : true) &&
      (filters.pair ? trade.pair.toLowerCase().includes(filters.pair.toLowerCase()) : true) &&
      (filters.session ? trade.session === filters.session : true) &&
      (filters.result ? trade.result === filters.result : true)
    );
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Journal History</h1>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label htmlFor="date" className="block mb-1 text-sm text-gray-400">Date</label>
          <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="pair" className="block mb-1 text-sm text-gray-400">Pair</label>
          <input type="text" name="pair" value={filters.pair} onChange={handleFilterChange} placeholder="e.g., EURUSD" className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="session" className="block mb-1 text-sm text-gray-400">Session</label>
          <select name="session" value={filters.session} onChange={handleFilterChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All</option>
            <option>London</option>
            <option>New York</option>
          </select>
        </div>
        <div>
          <label htmlFor="result" className="block mb-1 text-sm text-gray-400">Result</label>
          <select name="result" value={filters.result} onChange={handleFilterChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All</option>
            <option>Win</option>
            <option>Loss</option>
            <option>BE</option>
          </select>
        </div>
      </div>

      {/* Trade List */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Pair</th>
              <th className="p-4 font-semibold">Session</th>
              <th className="p-4 font-semibold">Direction</th>
              <th className="p-4 font-semibold">Result</th>
              <th className="p-4 font-semibold">R:R</th>
              <th className="p-4 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="p-4">{trade.date}</td>
                <td className="p-4">{trade.pair}</td>
                <td className="p-4">{trade.session}</td>
                <td className="p-4">{trade.direction}</td>
                <td className={`p-4 font-semibold ${
                    trade.result === 'Win' ? 'text-green-500' :
                    trade.result === 'Loss' ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {trade.result}
                </td>
                <td className="p-4">{trade.rr}</td>
                <td className="p-4">
                  <button className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTrades.length === 0 && (
            <p className="p-4 text-center text-gray-400">No trades found.</p>
        )}
      </div>
    </div>
  );
};

export default JournalHistory;