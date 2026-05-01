const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');
const Enrollment = require('../models/enrollmentModel');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res) => {
  const { title, description, price, thumbnail, category, level, lessons } = req.body;

  const course = new Course({
    title,
    description,
    price,
    thumbnail,
    category,
    level,
    instructor: req.user._id,
  });

  const createdCourse = await course.save();

  if (lessons && lessons.length > 0) {
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      if (l.title && (l.videoUrl || l.content)) {
        const lesson = new Lesson({
          title: l.title,
          content: l.videoUrl || l.content,
          type: 'video',
          course: createdCourse._id,
          order: i + 1,
        });
        const savedLesson = await lesson.save();
        createdCourse.lessons.push(savedLesson._id);
      }
    }
    await createdCourse.save();
  }

  res.status(201).json(createdCourse);
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  const courses = await Course.find({ status: 'Published' }).populate('instructor', 'name');
  res.json(courses);
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('instructor', 'name')
    .populate('lessons');

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Add lesson to course
// @route   POST /api/courses/:id/lessons
// @access  Private/Instructor
const addLesson = async (req, res) => {
  const { title, content, type, duration, order } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to add lessons to this course' });
    }

    const lesson = new Lesson({
      title,
      content,
      type,
      duration,
      order,
      course: course._id
    });

    const createdLesson = await lesson.save();
    course.lessons.push(createdLesson._id);
    await course.save();

    res.status(201).json(createdLesson);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
const enrollInCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: course._id
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      user: req.user._id,
      course: course._id,
    });

    await enrollment.save();

    course.studentsEnrolled.push(req.user._id);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Instructor
const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this course' });
    }

    const { lessons, ...courseData } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      courseData,
      { new: true }
    );

    if (lessons) {
      // Remove old lessons
      await Lesson.deleteMany({ course: updatedCourse._id });
      updatedCourse.lessons = [];

      for (let i = 0; i < lessons.length; i++) {
        const l = lessons[i];
        if (l.title && (l.videoUrl || l.content)) {
          const lesson = new Lesson({
            title: l.title,
            content: l.videoUrl || l.content,
            type: 'video',
            course: updatedCourse._id,
            order: i + 1,
          });
          const savedLesson = await lesson.save();
          updatedCourse.lessons.push(savedLesson._id);
        }
      }
      await updatedCourse.save();
    }

    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  addLesson,
  enrollInCourse,
  updateCourse,
  deleteCourse,
};
