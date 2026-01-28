const Trade = require('../models/Trade');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get stats
// @route     GET /api/v1/stats
// @access    Private
exports.getStats = asyncHandler(async (req, res, next) => {
  const trades = await Trade.find({ user: req.user.id });

  if (!trades || trades.length === 0) {
    return next(new ErrorResponse('No trades found for this user', 404));
  }

  const totalTrades = trades.length;
  const winningTrades = trades.filter((trade) => trade.result === 'Win');
  const losingTrades = trades.filter((trade) => trade.result === 'Loss');
  const beTrades = trades.filter((trade) => trade.result === 'BE');

  const winRate = (winningTrades.length / totalTrades) * 100;
  
  const totalRR = trades.reduce((acc, trade) => acc + (trade.rr || 0), 0);
  const avgRR = totalRR / totalTrades;

  const sessionPerformance = trades.reduce((acc, trade) => {
    acc[trade.session] = (acc[trade.session] || 0) + 1;
    return acc;
  }, {});

  const bestSession = Object.keys(sessionPerformance).reduce((a, b) =>
    sessionPerformance[a] > sessionPerformance[b] ? a : b
  );

  res.status(200).json({
    success: true,
    data: {
      totalTrades,
      winRate: winRate.toFixed(2),
      avgRR: avgRR.toFixed(2),
      bestSession,
      winLossData: {
        wins: winningTrades.length,
        losses: losingTrades.length,
        be: beTrades.length,
      },
      sessionPerformance,
    },
  });
});
