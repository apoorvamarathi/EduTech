const cron = require('node-cron');
const User = require('../models/userModel');

const startCronJobs = () => {
  // Example Job: Run every day at 10:00 AM IST to notify unverified users
  cron.schedule('0 10 * * *', async () => {
    console.log('[CRON] Running daily check for unverified users...');
    try {
      // Find users unverified for more than 24 hours
      const unverifiedUsers = await User.find({ isVerified: false, createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
      console.log(`[CRON] Found ${unverifiedUsers.length} old unverified users.`);
    } catch (error) {
      console.error('[CRON] Error:', error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Job 2: Auto Archive expired courses (Daily at Midnight)
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Checking for expired courses...');
    const Course = require('../models/courseModel');
    await Course.updateMany(
      { expiryDate: { $lt: new Date() }, status: 'Published' },
      { status: 'Archived' }
    );
  });

  // Job 3: Inactive Student Reminders (Weekly on Sunday)
  cron.schedule('0 0 * * 0', async () => {
    console.log('[CRON] Notifying inactive students...');
    const Enrollment = require('../models/enrollmentModel');
    const inactivePeriod = 7 * 24 * 60 * 60 * 1000; // 7 days
    const inactiveEnrollments = await Enrollment.find({
      status: 'active',
      updatedAt: { $lt: new Date(Date.now() - inactivePeriod) }
    }).populate('user');
    // Logic to send emails to inactiveEnrollments.map(e => e.user.email)
  });

  // Job 4: Discount Campaigns (Daily Check)
  cron.schedule('0 1 * * *', async () => {
    console.log('[CRON] Monitoring scheduled discounts...');
    // Logic to apply/remove discounts based on discountStart/End
  });

  console.log('Cron jobs initialized (IST Timezone).');
};

module.exports = startCronJobs;
