// frontend/src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setEnrolledCourses([
        { id: 1, title: 'React Mastery', progress: 65, thumbnail: 'https://via.placeholder.com/300x150' },
        { id: 2, title: 'Node.js Backend', progress: 30, thumbnail: 'https://via.placeholder.com/300x150' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const stats = [
    { label: 'Courses Enrolled', value: '8', change: '+2 this month' },
    { label: 'Certificates Earned', value: '5', change: '+1 new' },
    { label: 'Hours Learned', value: '124', change: '+12 this week' },
    { label: 'Job Applications', value: '3', change: '2 shortlisted' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Welcome back, Student!</h1>
          <p style={{ color: 'var(--text)' }}>Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text)' }}>{s.label}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--accent)' }}>{s.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-h)' }}>My Courses</h2>
            <Link to="/courses" style={{ color: 'var(--accent)' }}>Browse more →</Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-h)' }}>{course.title}</h3>
                    <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
                      <div className="h-full rounded-full" style={{ width: `${course.progress}%`, background: 'var(--accent)' }}></div>
                    </div>
                    <p className="text-sm mt-2" style={{ color: 'var(--text)' }}>{course.progress}% complete</p>
                    <Link to={`/course/${course.id}`} className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--accent)' }}>Continue →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}