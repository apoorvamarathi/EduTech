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

  if (loading) return <Layout><div className="text-center py-20">Loading Admin Panel...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage platform, courses, users, and finances</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.users}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.courses}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹{stats.revenue}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Instructors</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.instructors}</p>
          </div>
        </div>

        {/* Pending Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Course Approvals</h2>
          {pendingCourses.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No courses awaiting approval.</p>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map(course => (
                <div key={course._id} className="flex justify-between items-center p-4 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500">Instructor: {course.instructor?.name} | Category: {course.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(course._id)} 
                      className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Approve & Publish
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">New user registered: john@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">Course "React Mastery" published</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">Payment received: ₹49 from student</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
