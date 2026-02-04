const express = require("express");
const router = express.Router();

const dailyMarkingController = require("../controllers/dailyMarking");
const { protect } = require("../middleware/auth");

// routes/dailyMarking.js
router.use("/:dailyMarkingId/trades", require("./trades"));

// Get all & create
router.get("/", protect, dailyMarkingController.getDailyMarkings);
router.post("/", protect, dailyMarkingController.createDailyMarking);

// Get one, update, delete
router.get("/:id", protect, dailyMarkingController.getDailyMarking);
router.put("/:id", protect, dailyMarkingController.updateDailyMarking);
router.delete("/:id", protect, dailyMarkingController.deleteDailyMarking);

module.exports = router;
