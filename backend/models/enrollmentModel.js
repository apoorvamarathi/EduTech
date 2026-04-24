const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    progress: {
      type: Number,
      default: 0,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    certificateUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
