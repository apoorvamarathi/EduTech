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

  console.log('Cron jobs initialized (IST Timezone).');
};

module.exports = startCronJobs;
