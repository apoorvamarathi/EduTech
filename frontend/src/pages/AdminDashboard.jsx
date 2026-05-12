



// frontend/src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, revenue: 0, instructors: 0 });
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dashboardStats } = await api.get('/admin/stats');
        setStats(dashboardStats);
        
        const { data: courses } = await api.get('/courses/admin/pending');
        setPendingCourses(courses);
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (courseId) => {
    try {
      await api.put(`/courses/${courseId}/approve`);
      setPendingCourses(prev => prev.filter(c => c._id !== courseId));
      alert('Course approved and published!');
    } catch (err) {
      alert('Failed to approve course');
    }
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading Admin Panel...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Control Center</h1>
          <p className="text-indigo-300 mt-1">Manage platform, courses, users, and finances</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 hover:border-indigo-500/40 transition">
            <p className="text-sm text-indigo-300">Total Students</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.users}</p>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 hover:border-indigo-500/40 transition">
            <p className="text-sm text-indigo-300">Active Courses</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.courses}</p>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 hover:border-indigo-500/40 transition">
            <p className="text-sm text-indigo-300">Platform Revenue</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">₹{stats.revenue}</p>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 hover:border-indigo-500/40 transition">
            <p className="text-sm text-indigo-300">Verified Instructors</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.instructors}</p>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Pending Course Approvals</h2>
          {pendingCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-gray-400">No courses awaiting approval.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map(course => (
                <div key={course._id} className="flex justify-between items-center p-4 rounded-lg bg-[#0F172A]/50 border border-indigo-500/20 hover:border-indigo-500/40 transition">
                  <div>
                    <h3 className="font-bold text-white">{course.title}</h3>
                    <p className="text-xs text-indigo-300 mt-1">Instructor: {course.instructor?.name} | Category: {course.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(course._id)} 
                      className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Approve & Publish
                    </button>
                    <button 
                      className="px-4 py-1.5 rounded-lg text-sm font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
                    >
                      Reject
                    </button>
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