const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Course = require('./models/courseModel');

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'instructor',
    isVerified: true,
  },
  {
    name: 'Student User',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    isVerified: true,
  },
  {
    name: 'Recruiter User',
    email: 'recruiter@example.com',
    password: 'password123',
    role: 'recruiter',
    isVerified: true,
  },
];

const courses = [
  {
    title: 'Modern Web Development',
    description: 'Learn React, Node, and MongoDB from scratch.',
    price: 49.99,
  },
  {
    title: 'Python for Data Science',
    description: 'Master Python and its libraries for data analysis.',
    price: 39.99,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Course.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleCourses = courses.map((course) => {
      return { ...course, instructor: adminUser };
    });

    await Course.insertMany(sampleCourses);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Course.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
