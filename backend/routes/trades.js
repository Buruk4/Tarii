const express = require("express");
const {
  getTrades,
  getTrade,
  createTrade,
  updateTrade,
  deleteTrade,
} = require("../controllers/trades");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

// Get all trades for a daily marking
router.route("/").get(protect, getTrades);
router.route("/").post(protect, createTrade);

// Get, update, delete a single trade
router.route("/:id").get(protect, getTrade);
router.route("/:id").put(protect, updateTrade);
router.route("/:id").delete(protect, deleteTrade);

module.exports = router;
