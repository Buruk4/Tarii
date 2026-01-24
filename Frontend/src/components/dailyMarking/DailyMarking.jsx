import React, { useState } from 'react';

const DailyMarking = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    pair: '',
    htfBias: 'Buy',
    premiumOrDiscount: 'Premium',
    liquidityTargeted: 'Buy-side',
    previousDayHigh: '',
    previousDayLow: '',
    asianHighLow: '',
    modelPlanned: '2022 Model',
    session: 'London',
    screenshot: null,
    notes: '',
  });

  const {
    date,
    pair,
    htfBias,
    premiumOrDiscount,
    liquidityTargeted,
    previousDayHigh,
    previousDayLow,
    asianHighLow,
    modelPlanned,
    session,
    notes,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setFormData({ ...formData, screenshot: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Implement save logic here
    console.log('Daily Marking submitted', formData);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Add Daily Marking</h1>
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 text-sm text-gray-400">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pair" className="mb-1 text-sm text-gray-400">
              Pair / Instrument
            </label>
            <input
              type="text"
              name="pair"
              value={pair}
              onChange={onChange}
              placeholder="e.g., EURUSD"
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="htfBias" className="mb-1 text-sm text-gray-400">
              HTF Bias
            </label>
            <select
              name="htfBias"
              value={htfBias}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Buy</option>
              <option>Sell</option>
              <option>Range</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="premiumOrDiscount"
              className="mb-1 text-sm text-gray-400"
            >
              Premium or Discount
            </label>
            <select
              name="premiumOrDiscount"
              value={premiumOrDiscount}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Premium</option>
              <option>Discount</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="liquidityTargeted"
              className="mb-1 text-sm text-gray-400"
            >
              Liquidity Targeted
            </label>
            <select
              name="liquidityTargeted"
              value={liquidityTargeted}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Buy-side</option>
              <option>Sell-side</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="notes"
              className="mb-1 text-sm text-gray-400"
            >
              Notes
            </label>
            <textarea
              name="notes"
              value={notes}
              onChange={onChange}
              rows="4"
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Levels</h3>
          <div className="flex flex-col">
            <label
              htmlFor="previousDayHigh"
              className="mb-1 text-sm text-gray-400"
            >
              Previous Day High
            </label>
            <input
              type="text"
              name="previousDayHigh"
              value={previousDayHigh}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="previousDayLow"
              className="mb-1 text-sm text-gray-400"
            >
              Previous Day Low
            </label>
            <input
              type="text"
              name="previousDayLow"
              value={previousDayLow}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="asianHighLow"
              className="mb-1 text-sm text-gray-400"
            >
              Asian High / Low
            </label>
            <input
              type="text"
              name="asianHighLow"
              value={asianHighLow}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="modelPlanned"
              className="mb-1 text-sm text-gray-400"
            >
              Model Planned
            </label>
            <select
              name="modelPlanned"
              value={modelPlanned}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>2022 Model</option>
              <option>Liquidity Sweep + MSS</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="session" className="mb-1 text-sm text-gray-400">
              Session
            </label>
            <select
              name="session"
              value={session}
              onChange={onChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>London</option>
              <option>New York</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="screenshot"
              className="mb-1 text-sm text-gray-400"
            >
              Screenshot (optional)
            </label>
            <input
              type="file"
              name="screenshot"
              onChange={onFileChange}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Marking
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyMarking;