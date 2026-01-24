import React, { useState, useEffect } from 'react';

const TradeJournal = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    pair: '',
    session: 'London',
    direction: 'Buy',
    entry: '',
    stopLoss: '',
    takeProfit: '',
    risk: '1',
    rr: '',
    modelUsed: '2022 Model',
    result: 'Win',
    screenshotBefore: null,
    screenshotAfter: null,
    emotionBefore: '',
    lessonLearned: '',
  });

  const {
    date,
    pair,
    session,
    direction,
    entry,
    stopLoss,
    takeProfit,
    risk,
    rr,
    modelUsed,
    result,
    emotionBefore,
    lessonLearned,
  } = formData;

  useEffect(() => {
    if (entry && stopLoss && takeProfit) {
      const entryPrice = parseFloat(entry);
      const stopLossPrice = parseFloat(stopLoss);
      const takeProfitPrice = parseFloat(takeProfit);

      if (!isNaN(entryPrice) && !isNaN(stopLossPrice) && !isNaN(takeProfitPrice) && stopLossPrice !== entryPrice) {
        const riskAmount = Math.abs(entryPrice - stopLossPrice);
        const rewardAmount = Math.abs(takeProfitPrice - entryPrice);
        const calculatedRr = (rewardAmount / riskAmount).toFixed(2);
        setFormData((prev) => ({ ...prev, rr: calculatedRr }));
      }
    }
  }, [entry, stopLoss, takeProfit]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Implement save logic here
    console.log('Trade Journal submitted', formData);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Add Trade</h1>
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 text-sm text-gray-400">Date</label>
            <input type="date" name="date" value={date} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pair" className="mb-1 text-sm text-gray-400">Pair</label>
            <input type="text" name="pair" value={pair} onChange={onChange} placeholder="e.g., EURUSD" className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="session" className="mb-1 text-sm text-gray-400">Session</label>
            <select name="session" value={session} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>London</option>
              <option>New York</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="direction" className="mb-1 text-sm text-gray-400">Direction</label>
            <select name="direction" value={direction} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="entry" className="mb-1 text-sm text-gray-400">Entry Price</label>
            <input type="number" name="entry" value={entry} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stopLoss" className="mb-1 text-sm text-gray-400">Stop Loss</label>
            <input type="number" name="stopLoss" value={stopLoss} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="takeProfit" className="mb-1 text-sm text-gray-400">Take Profit</label>
            <input type="number" name="takeProfit" value={takeProfit} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="risk" className="mb-1 text-sm text-gray-400">Risk %</label>
            <input type="number" name="risk" value={risk} onChange={onChange} max="1" step="0.01" className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
           <div className="flex flex-col">
            <label htmlFor="rr" className="mb-1 text-sm text-gray-400">RR</label>
            <input type="text" name="rr" value={rr} readOnly className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-md" />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
           <div className="flex flex-col">
            <label htmlFor="modelUsed" className="mb-1 text-sm text-gray-400">Model Used</label>
            <select name="modelUsed" value={modelUsed} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>2022 Model</option>
              <option>Liquidity Sweep + MSS</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="result" className="mb-1 text-sm text-gray-400">Result</label>
            <select name="result" value={result} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Win</option>
              <option>Loss</option>
              <option>BE</option>
            </select>
          </div>
           <div className="flex flex-col">
            <label htmlFor="screenshotBefore" className="mb-1 text-sm text-gray-400">Screenshot Before</label>
            <input type="file" name="screenshotBefore" onChange={onFileChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="screenshotAfter" className="mb-1 text-sm text-gray-400">Screenshot After</label>
            <input type="file" name="screenshotAfter" onChange={onFileChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Bottom Fields */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
                <label htmlFor="emotionBefore" className="mb-1 text-sm text-gray-400">Emotion Before Trade</label>
                <input type="text" name="emotionBefore" value={emotionBefore} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lessonLearned" className="mb-1 text-sm text-gray-400">Lesson Learned</label>
                <input type="text" name="lessonLearned" value={lessonLearned} onChange={onChange} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
        </div>


        {/* Submit Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Trade
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeJournal;