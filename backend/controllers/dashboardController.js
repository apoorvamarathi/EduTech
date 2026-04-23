const Course = require('../models/courseModel');
const User = require('../models/userModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  const userRole = req.user.role;

  if (userRole === 'instructor') {
    const courses = await Course.find({ instructor: req.user._id });
    const studentCount = courses.reduce((acc, course) => acc + course.studentsEnrolled.length, 0);
    
    res.json({
      role: 'instructor',
      stats: {
        totalCourses: courses.length,
        totalStudents: studentCount,
      },
      courses: courses.map(c => ({
        id: c._id,
        title: c.title,
        studentsCount: c.studentsEnrolled.length
      }))
    });
  } else if (userRole === 'student') {
    const enrolledCourses = await Course.find({
      studentsEnrolled: { $in: [req.user._id] }
    }).populate('instructor', 'name');

    res.json({
      role: 'student',
      stats: {
        enrolledCount: enrolledCourses.length,
      },
      courses: enrolledCourses
    });
  } else {
    res.status(400).json({ message: 'Unknown role dashboard not implemented' });
  }
};

module.exports = {
  getDashboardData,
};
