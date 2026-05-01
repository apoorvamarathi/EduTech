const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
});

const quizSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    passingScore: {
      type: Number,
      default: 70, // percentage
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
