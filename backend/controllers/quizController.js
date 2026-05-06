const Quiz = require('../models/quizModel');
const Enrollment = require('../models/enrollmentModel');
const { getEventEmitter } = require('../services/eventEmitter');

const createQuiz = async (req, res) => {
  const { course, title, questions, passingScore } = req.body;

  if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const quiz = await Quiz.create({ course, title, questions, passingScore });
  res.status(201).json(quiz);
};

const getQuizzesForCourse = async (req, res) => {
  const quizzes = await Quiz.find({ course: req.params.courseId });
  res.status(200).json(quizzes);
};

const QuizSubmission = require('../models/quizSubmissionModel');

const submitQuiz = async (req, res) => {
  const { answers, timeTaken } = req.body; 
  const quiz = await Quiz.findById(req.params.quizId);

  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  let score = 0;
  quiz.questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) score++;
  });

  const percentage = (score / quiz.questions.length) * 100;
  const passed = percentage >= quiz.passingScore;

  // Save submission
  await QuizSubmission.create({
    user: req.user._id,
    quiz: quiz._id,
    score,
    percentage,
    passed,
    timeTaken
  });

  if (passed) {
    const enrollment = await Enrollment.findOne({ course: quiz.course, user: req.user._id });
    if (enrollment) {
      enrollment.status = 'completed';
      enrollment.progress = 100;
      await enrollment.save();
      
      const eventEmitter = getEventEmitter();
      if(eventEmitter) {
         eventEmitter.emit('CourseCompleted', {
           studentId: req.user._id,
           courseId: quiz.course,
         });
      }
    }
  }
  res.status(200).json({ score, percentage, passed });
};

const getLeaderboard = async (req, res) => {
  const submissions = await QuizSubmission.find({ quiz: req.params.quizId })
    .populate('user', 'name')
    .sort({ percentage: -1, timeTaken: 1 })
    .limit(10);
  
  res.json(submissions);
};

const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
};

module.exports = { createQuiz, getQuizzesForCourse, submitQuiz, getQuizById, getLeaderboard };
