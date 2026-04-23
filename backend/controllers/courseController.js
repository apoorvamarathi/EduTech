const Course = require('../models/courseModel');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res) => {
  const { title, description, price, thumbnail } = req.body;

  const course = new Course({
    title,
    description,
    price,
    thumbnail,
    instructor: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  const courses = await Course.find({}).populate('instructor', 'name');
  res.json(courses);
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
const enrollInCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    const alreadyEnrolled = course.studentsEnrolled.find(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.studentsEnrolled.push(req.user._id);
    await course.save();
    res.status(200).json({ message: 'Enrolled successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

module.exports = {
  createCourse,
  getCourses,
  enrollInCourse,
};
