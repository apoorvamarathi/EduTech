const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const Course = require('./models/courseModel');

const checkCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const courses = await Course.find({});
    console.log(`Total courses in DB: ${courses.length}`);
    courses.forEach(c => {
      console.log(`- ${c.title} (Status: ${c.status})`);
    });

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkCourses();
