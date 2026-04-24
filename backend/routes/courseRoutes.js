const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  addLesson,
  enrollInCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCourses)
  .post(protect, authorize('instructor'), createCourse);

router.route('/:id')
  .get(getCourseById);

router.route('/:id/lessons')
  .post(protect, authorize('instructor'), addLesson);

router.post('/:id/enroll', protect, authorize('student'), enrollInCourse);

module.exports = router;
