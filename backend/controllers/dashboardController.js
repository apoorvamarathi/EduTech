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

const Certificate = require('../models/certificateModel');
const User = require('../models/userModel');

const getLeaderboard = async (req, res) => {
  // Simple leaderboard: top students by number of certificates
  try {
    const leaderboardData = await Certificate.aggregate([
      {
        $group: {
          _id: '$student',
          certificatesEarned: { $sum: 1 },
        },
      },
      {
        $sort: { certificatesEarned: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const populatedLeaderboard = await User.populate(leaderboardData, { path: '_id', select: 'name email' });
    
    const formattedLeaderboard = populatedLeaderboard.map((item, index) => ({
      rank: index + 1,
      id: item._id._id,
      name: item._id.name,
      score: item.certificatesEarned * 100, // 100 points per certificate
      badges: item.certificatesEarned >= 5 ? ['Master'] : item.certificatesEarned >= 1 ? ['Scholar'] : ['Beginner'],
    }));

    res.status(200).json(formattedLeaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
};

module.exports = {
  getDashboardData,
  getLeaderboard,
};
