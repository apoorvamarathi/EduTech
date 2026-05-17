const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    isVerified: true,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    await User.create(users);

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
