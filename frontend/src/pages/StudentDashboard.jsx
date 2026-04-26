// frontend/src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real enrolled courses from localStorage (or API)
    const savedEnrollments = localStorage.getItem('enrolledCourses');
    if (savedEnrollments) {
      setEnrolledCourses(JSON.parse(savedEnrollments));
      setLoading(false);
    } else {
      // No courses yet – show empty state
      setEnrolledCourses([]);
      setLoading(false);
    }
  }, []);

  // Helper to get progress for a course (stored in localStorage)
  const getProgress = (courseId) => {
    const progress = localStorage.getItem(`progress_${courseId}`);
    return progress ? parseInt(progress) : 0;
  };

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length.toString(), change: '' },
    { label: 'Certificates Earned', value: '0', change: 'Complete a quiz to earn' },
    { label: 'Hours Learned', value: '0', change: 'Start learning' },
    { label: 'Job Applications', value: '0', change: 'Apply to jobs' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Welcome back, Student!</h1>
          <p style={{ color: 'var(--text)' }}>Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text)' }}>{s.label}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--accent)' }}>{s.change}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-h)' }}>My Courses</h2>
            <Link to="/courses" style={{ color: 'var(--accent)' }}>Browse more →</Link>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : enrolledCourses.length === 0 ? (
            <div className="text-center py-8 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text)' }}>You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="inline-block mt-3 px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Browse Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map(course => {
                const progress = getProgress(course.id);
                return (
                  <div key={course.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-h)' }}>{course.title}</h3>
                      <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--accent)' }}></div>
                      </div>
                      <p className="text-sm mt-2" style={{ color: 'var(--text)' }}>{progress}% complete</p>
                      <Link to={`/course-learn/${course.id}`} className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--accent)' }}>Continue Learning →</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
