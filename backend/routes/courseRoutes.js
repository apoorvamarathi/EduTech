const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  enrollInCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCourses)
  .post(protect, authorize('instructor'), createCourse);

router.post('/:id/enroll', protect, authorize('student'), enrollInCourse);

module.exports = router;
