// frontend/src/pages/InstructorEarnings.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function InstructorEarnings() {
  const [stats, setStats] = useState({ totalRevenue: 0, pendingPayout: 0, completedPayout: 0, courses: [] });
  useEffect(() => {
    // Mock data
    setStats({
      totalRevenue: 12500,
      pendingPayout: 3800,
      completedPayout: 8700,
      courses: [
        { title: 'React Mastery', revenue: 5200, students: 104, share: 70 },
        { title: 'Node.js Backend', revenue: 3600, students: 72, share: 70 },
        { title: 'Advanced CSS', revenue: 3700, students: 74, share: 70 },
      ],
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Earnings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>₹{stats.totalRevenue}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Pending Payout</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>₹{stats.pendingPayout}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Completed Payout</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>₹{stats.completedPayout}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-h)' }}>Course-wise Earnings (70% revenue share)</h2>
          <div className="space-y-3">
            {stats.courses.map(course => (
              <div key={course.title} className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-h)' }}>{course.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text)' }}>{course.students} students enrolled</p>
                </div>
                <p className="font-bold" style={{ color: 'var(--accent)' }}>₹{course.revenue}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--text)' }}>Revenue split: 70% instructor, 30% platform fee. Payouts processed monthly.</p>
        </div>
        <button className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Request Payout</button>
      </div>
    </Layout>
  );
}