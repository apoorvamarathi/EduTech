// frontend/src/pages/InstructorEarnings.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function InstructorEarnings() {
  const [stats, setStats] = useState({ totalRevenue: 0, pendingPayout: 0, completedPayout: 0, courses: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await api.get('/dashboard');
        
        // Calculate payouts based on 70% share of total revenue
        const totalEarned = (data.stats?.totalRevenue || 0) * 0.7;
        
        setStats({
          totalRevenue: data.stats?.totalRevenue || 0,
          pendingPayout: totalEarned, // Assuming all is pending for now
          completedPayout: 0,
          courses: data.courses || [],
        });
      } catch (err) {
        console.error('Failed to fetch earnings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  if (loading) return <Layout><div className="text-center py-20">Loading earnings...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Earnings Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Course Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>₹{stats.totalRevenue}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>My Pending Payout (70%)</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>₹{stats.pendingPayout.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Completed Payouts</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>₹{stats.completedPayout}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-h)' }}>Course-wise Earnings (70% revenue share)</h2>
          {stats.courses.length === 0 ? (
            <p style={{ color: 'var(--text)' }}>No course earnings yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.courses.map(course => (
                <div key={course.id} className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--text-h)' }}>{course.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text)' }}>{course.students} students enrolled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--text)' }}>Total: ₹{course.revenue}</p>
                    <p className="font-bold" style={{ color: 'var(--accent)' }}>My Share: ₹{(course.revenue * 0.7).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs mt-3" style={{ color: 'var(--text)' }}>Revenue split: 70% instructor, 30% platform fee. Payouts processed monthly.</p>
        </div>
        <button className="px-4 py-2 rounded-lg font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Request Payout</button>
      </div>
    </Layout>
  );
}