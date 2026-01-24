const express = require('express');
const {
  getDailyMarkings,
  getDailyMarking,
  createDailyMarking,
  updateDailyMarking,
  deleteDailyMarking,
} = require('../controllers/dailyMarking');

const router = express.Router();

router
  .route('/')
  .get(getDailyMarkings)
  .post(createDailyMarking);

router
  .route('/:id')
  .get(getDailyMarking)
  .put(updateDailyMarking)
  .delete(deleteDailyMarking);

module.exports = router;
