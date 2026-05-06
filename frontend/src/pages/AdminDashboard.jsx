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
        const { data: dashboardStats } = await api.get('/admin/stats'); // I'll add this route
        setStats(dashboardStats);
        
        const { data: courses } = await api.get('/courses/admin/pending'); // I'll add this route
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
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Admin Control Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Students</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.users}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Active Courses</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.courses}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Platform Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>₹{stats.revenue}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Verified Instructors</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.instructors}</p>
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>Pending Course Approvals</h2>
          {pendingCourses.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No courses awaiting approval.</p>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map(course => (
                <div key={course._id} className="flex justify-between items-center p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <h3 className="font-bold">{course.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--text)' }}>Instructor: {course.instructor?.name} | Category: {course.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(course._id)} className="px-4 py-1.5 rounded-lg text-sm font-medium" style={{ background: 'var(--accent)', color: 'white' }}>Approve & Publish</button>
                    <button className="px-4 py-1.5 rounded-lg text-sm font-medium border" style={{ borderColor: 'red', color: 'red' }}>Reject</button>
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