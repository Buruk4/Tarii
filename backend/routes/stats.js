const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/stats');

const { protect } = require('../middleware/auth');

router.route('/').get(protect, getStats);

module.exports = router;
