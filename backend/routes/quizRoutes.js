const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzesForCourse, submitQuiz, getQuizById } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createQuiz);
router.route('/course/:courseId').get(protect, getQuizzesForCourse);
router.route('/:id').get(protect, getQuizById);
router.route('/:quizId/submit').post(protect, submitQuiz);

module.exports = router;
