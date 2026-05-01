const express = require('express');
const router = express.Router();
const {
  getDashboardData,
  getLeaderboard,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDashboardData);
router.route('/leaderboard').get(protect, getLeaderboard);

module.exports = router;
