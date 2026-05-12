



// frontend/src/pages/StudentDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      enrolledCourses: 0,
      certificatesEarned: 0,
      hoursLearned: 0,
      jobApplications: 0,
    },
    courses: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: '📚 Courses Enrolled', value: (dashboardData.stats?.enrolledCount || dashboardData.stats?.enrolledCourses || 0).toString(), change: 'Keep learning!', icon: '📚' },
    { label: '🏆 Certificates', value: (dashboardData.stats?.certificatesEarned || 0).toString(), change: 'Keep it up!', icon: '🏆' },
    { label: '⏱️ Hours Learned', value: (dashboardData.stats?.hoursLearned || 0).toString(), change: 'Great progress', icon: '⏱️' },
    { label: '💼 Applications', value: (dashboardData.stats?.jobApplications || 0).toString(), change: 'Track in Jobs', icon: '💼' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
          <p className="text-indigo-300 mt-1">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -2 }} 
              className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition"
            >
              <p className="text-sm text-indigo-300">{s.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{s.value}</p>
              <p className="text-xs text-indigo-400 mt-1">{s.change}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">📖 My Courses</h2>
            <Link to="/courses" className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1">
              Browse more <span>→</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-20 text-white">Loading your courses...</div>
          ) : dashboardData.courses.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <p className="text-gray-400">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="inline-block mt-4 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardData.courses.map(course => {
                const progress = course.progress || 0;
                return (
                  <div key={course.id} className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=200&fit=crop'} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-indigo-600/90 text-white text-xs px-2 py-1 rounded-lg">
                        {progress}%
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">{course.title}</h3>
                      <div className="w-full h-2 rounded-full bg-[#0F172A] mt-3">
                        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-sm mt-2 text-indigo-300">{progress}% complete</p>
                      <Link to={`/course-learn/${course.id}`} className="mt-3 inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300 transition">
                        Continue Learning →
                      </Link>
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