const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboard');

const { protect } = require('../middleware/auth');

router.route('/').get(protect, getDashboardData);

module.exports = router;
