const express = require("express");
const {
  getDailyMarkings,
  getDailyMarking,
  createDailyMarking,
  updateDailyMarking,
  deleteDailyMarking,
} = require("../controllers/dailyMarking");

const { protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, getDailyMarkings)
  .post(protect, createDailyMarking);

router
  .route("/:id")
  .get(protect, getDailyMarking)
  .put(protect, updateDailyMarking)
  .delete(protect, deleteDailyMarking);

module.exports = router;
