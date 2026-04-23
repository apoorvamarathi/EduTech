// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, revenue: 0, instructors: 0 });
  useEffect(() => {
    setTimeout(() => {
      setStats({ users: 2450, courses: 128, revenue: 45800, instructors: 45 });
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Users</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.users}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Courses</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.courses}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>${stats.revenue}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Instructors</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.instructors}</p>
          </div>
        </div>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>Recent Activity</h2>
          <div className="space-y-2 text-sm" style={{ color: 'var(--text)' }}>
            <p>✅ New user registered: john@example.com</p>
            <p>📚 Course "React Mastery" published</p>
            <p>💰 Payment received: $49 from student</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}