const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a lesson title'],
    },
    content: {
      type: String,
      required: [true, 'Please add lesson content (URL or text)'],
    },
    type: {
      type: String,
      enum: ['video', 'text', 'quiz'],
      default: 'video',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: String, // e.g., "10:30"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', lessonSchema);
