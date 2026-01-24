const Trade = require('../models/Trade');
const DailyMarking = require('../models/DailyMarking');

// @desc      Get all trades
// @route     GET /api/v1/trades
// @route     GET /api/v1/dailymarkings/:dailyMarkingId/trades
// @access    Private
exports.getTrades = async (req, res, next) => {
  try {
    let query;

    if (req.params.dailyMarkingId) {
      query = Trade.find({ dailyMarking: req.params.dailyMarkingId });
    } else {
      query = Trade.find({ user: req.user.id });
    }

    const trades = await query;

    res.status(200).json({
      success: true,
      count: trades.length,
      data: trades,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Get single trade
// @route     GET /api/v1/trades/:id
// @access    Private
exports.getTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findById(req.params.id).populate({
      path: 'dailyMarking',
      select: 'date bias',
    });

    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }

    // Make sure user is trade owner
    if (trade.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this trade' });
    }

    res.status(200).json({
      success: true,
      data: trade,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Create new trade
// @route     POST /api/v1/dailymarkings/:dailyMarkingId/trades
// @access    Private
exports.createTrade = async (req, res, next) => {
  try {
    req.body.dailyMarking = req.params.dailyMarkingId;
    req.body.user = req.user.id;

    const dailyMarking = await DailyMarking.findById(req.params.dailyMarkingId);

    if (!dailyMarking) {
      return res.status(404).json({ success: false, message: 'Daily marking not found' });
    }

    // Make sure user is daily marking owner
    if (dailyMarking.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized to add a trade to this daily marking' });
    }

    const trade = await Trade.create(req.body);

    res.status(201).json({
      success: true,
      data: trade,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Update trade
// @route     PUT /api/v1/trades/:id
// @access    Private
exports.updateTrade = async (req, res, next) => {
  try {
    let trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }

    // Make sure user is trade owner
    if (trade.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized to update this trade' });
    }

    trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: trade,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Delete trade
// @route     DELETE /api/v1/trades/:id
// @access    Private
exports.deleteTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }

    // Make sure user is trade owner
    if (trade.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized to delete this trade' });
    }

    await trade.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
