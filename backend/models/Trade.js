const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  dailyMarking: {
    type: mongoose.Schema.ObjectId,
    ref: 'DailyMarking',
    required: true,
  },
  pair: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    enum: ['Buy', 'Sell'],
    required: true,
  },
  entry: {
    type: Number,
    required: true,
  },
  stopLoss: {
    type: Number,
    required: true,
  },
  takeProfit: {
    type: Number,
    required: true,
  },
  risk: {
    type: Number,
    required: true,
  },
  rr: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    enum: ['Win', 'Loss', 'BE'],
    required: true,
  },
  emotions: {
    type: String,
  },
  lesson: {
    type: String,
  },
  screenshots: {
    before: String,
    after: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Trade', TradeSchema);
