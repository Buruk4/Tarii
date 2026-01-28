const Trade = require("../models/Trade");
const DailyMarking = require("../models/DailyMarking");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get dashboard data
// @route     GET /api/v1/dashboard
// @access    Private
exports.getDashboardData = asyncHandler(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const trades = await Trade.find({ user: req.user.id, date: { $gte: today } });
  const dailyMarking = await DailyMarking.findOne({
    user: req.user.id,
    date: { $gte: today },
  }).sort("-date");

  const wins = trades.filter((trade) => trade.result === "Win").length;
  const losses = trades.filter((trade) => trade.result === "Loss").length;

  res.status(200).json({
    success: true,
    data: {
      dailyMarking,
      trades: trades.length,
      wins,
      losses,
    },
  });
});
