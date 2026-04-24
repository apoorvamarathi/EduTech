const Course = require('../models/courseModel');
const Enrollment = require('../models/enrollmentModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  const userRole = req.user.role;

  if (userRole === 'instructor') {
    const courses = await Course.find({ instructor: req.user._id });
    const totalStudents = courses.reduce((acc, course) => acc + course.studentsEnrolled.length, 0);
    const totalRevenue = courses.reduce((acc, course) => acc + (course.studentsEnrolled.length * course.price), 0);
    
    res.json({
      role: 'instructor',
      stats: {
        totalCourses: courses.length,
        totalStudents,
        totalRevenue
      },
      courses: courses.map(c => ({
        id: c._id,
        title: c.title,
        students: c.studentsEnrolled.length,
        revenue: c.studentsEnrolled.length * c.price,
        status: c.status
      }))
    });
  } else if (userRole === 'student') {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course', 'title thumbnail price instructor')
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: 'name' }
      });

    res.json({
      role: 'student',
      stats: {
        enrolledCount: enrollments.length,
        certificatesEarned: enrollments.filter(e => e.status === 'completed').length,
      },
      courses: enrollments.map(e => ({
        id: e.course._id,
        title: e.course.title,
        thumbnail: e.course.thumbnail,
        progress: e.progress,
        status: e.status
      }))
    });
  } else {
    res.status(400).json({ message: 'Dashboard not implemented for this role' });
  }
};

module.exports = {
  getDashboardData,
};
