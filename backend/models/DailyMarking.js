const mongoose = require("mongoose");

const DailyMarkingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bias: {
    type: String,
    enum: ["Buy", "Sell", "Range"],
    required: true,
  },
  liquidityTarget: {
    type: String,
    enum: ["Buy-side", "Sell-side"],
    required: true,
  },
  session: {
    type: String,
    enum: ["London", "New York", "Asian"],
    required: true,
  },
  keyLevels: {
    previousDayHigh: Boolean,
    previousDayLow: Boolean,
    asianHigh: Boolean,
    asianLow: Boolean,
  },
  modelPlanned: {
    type: String,
    enum: ["2022 Model", "Liquidity Sweep + MSS", "Other"],
    required: true,
  },
  notes: {
    type: String,
  },
  screenshot: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DailyMarking", DailyMarkingSchema);
