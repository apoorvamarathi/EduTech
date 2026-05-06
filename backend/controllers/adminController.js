const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Transaction = require('../models/transactionModel');

const getAdminStats = async (req, res) => {
  const usersCount = await User.countDocuments({ role: 'student' });
  const coursesCount = await Course.countDocuments({ status: 'Published' });
  const instructorsCount = await User.countDocuments({ role: 'instructor' });
  
  const transactions = await Transaction.find({ status: 'success' });
  const totalRevenue = transactions.reduce((acc, t) => acc + t.platformRevenue, 0);

  res.json({
    users: usersCount,
    courses: coursesCount,
    revenue: totalRevenue.toFixed(2),
    instructors: instructorsCount
  });
};

module.exports = { getAdminStats };
