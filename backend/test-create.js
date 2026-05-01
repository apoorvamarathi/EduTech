const mongoose = require('mongoose');

(async () => {
  await mongoose.connect('mongodb://localhost:27017/edutech');
  const db = mongoose.connection.db;
  await db.collection('users').updateOne({ email: 'inst@test.com' }, { $set: { isVerified: true } });
  
  const loginRes = await fetch('http://localhost:5000/api/auth/login', { 
      method: 'POST', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ email: 'inst@test.com', password: 'pass' }) 
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  
  const courseRes = await fetch('http://localhost:5000/api/courses', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, 
      body: JSON.stringify({ title: 'Test', description: 'Test desc', category: 'Dev', price: 10 })
  });
  const courseData = await courseRes.json();
  if (!courseRes.ok) console.error('Error:', courseData.message || 'Error');
  else console.log('Course created!', courseData);
  
  process.exit(0);
})();
