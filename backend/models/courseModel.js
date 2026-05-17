const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: 'default-course.png',
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tags: [String],
    expiryDate: Date,
    discountPrice: Number,
    discountStart: Date,
    discountEnd: Date,
    status: {
      type: String,
      enum: ['Draft', 'Pending', 'Published', 'Archived', 'Rejected'],
      default: 'Pending', // New courses start as Pending for admin approval
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
