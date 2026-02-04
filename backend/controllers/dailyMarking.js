const DailyMarking = require("../models/DailyMarking");

// @desc      Get all daily markings
// @route     GET /api/v1/dailymarkings
// @access    Private
exports.getDailyMarkings = async (req, res, next) => {
  try {
    const dailyMarkings = await DailyMarking.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      count: dailyMarkings.length,
      data: dailyMarkings,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Get single daily marking
// @route     GET /api/v1/dailymarkings/:id
// @access    Private
exports.getDailyMarking = async (req, res, next) => {
  try {
    const dailyMarking = await DailyMarking.findById(req.params.id);

    if (!dailyMarking) {
      return res
        .status(404)
        .json({ success: false, message: "Daily marking not found" });
    }

    // Make sure user is daily marking owner
    if (dailyMarking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this daily marking",
      });
    }

    res.status(200).json({ success: true, data: dailyMarking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Create new daily marking
// @route     POST /api/v1/dailymarkings
// @access    Private
exports.createDailyMarking = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const dailyMarking = await DailyMarking.create(req.body);
    res.status(201).json({ success: true, data: dailyMarking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Update daily marking
// @route     PUT /api/v1/dailymarkings/:id
// @access    Private
exports.updateDailyMarking = async (req, res, next) => {
  try {
    let dailyMarking = await DailyMarking.findById(req.params.id);

    console.log(dailyMarking);

    if (!dailyMarking) {
      return res
        .status(404)
        .json({ success: false, message: "Daily marking not found" });
    }

    // Make sure user is daily marking owner
    if (dailyMarking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this daily marking",
      });
    }

    dailyMarking = await DailyMarking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({ success: true, data: dailyMarking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Delete daily marking
// @route     DELETE /api/v1/dailymarkings/:id
// @access    Private
exports.deleteDailyMarking = async (req, res, next) => {
  try {
    const dailyMarking = await DailyMarking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!dailyMarking) {
      return res.status(404).json({
        success: false,
        message: "Daily marking not found or not authorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Daily marking  deleted",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
