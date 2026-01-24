const express = require('express');
const {
  getTrades,
  getTrade,
  createTrade,
  updateTrade,
  deleteTrade,
} = require('../controllers/trades');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getTrades)
  .post(protect, createTrade);

router
  .route('/:id')
  .get(protect, getTrade)
  .put(protect, updateTrade)
  .delete(protect, deleteTrade);

module.exports = router;
