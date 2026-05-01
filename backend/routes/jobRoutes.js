const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  applyToJob,
  getApplications,
  updateApplicationStatus,
  getMyApplications,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getJobs).post(protect, createJob);
router.route('/apply').post(protect, applyToJob);
router.route('/applications').get(protect, getApplications);
router.route('/applications/my').get(protect, getMyApplications);
router.route('/applications/:id').put(protect, updateApplicationStatus);

module.exports = router;
