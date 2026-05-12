



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
        
        const totalEarned = (data.stats?.totalRevenue || 0) * 0.7;
        
        setStats({
          totalRevenue: data.stats?.totalRevenue || 0,
          pendingPayout: totalEarned,
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

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading earnings...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Earnings Dashboard</h1>
          <p className="text-indigo-300 mt-1">Track your revenue and payouts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Total Course Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">₹{stats.totalRevenue}</p>
          </div>
          <div className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">My Pending Payout (70%)</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">₹{stats.pendingPayout.toFixed(2)}</p>
          </div>
          <div className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Completed Payouts</p>
            <p className="text-2xl font-bold text-white mt-1">₹{stats.completedPayout}</p>
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <h2 className="text-xl font-semibold mb-4 text-white">Course-wise Earnings (70% revenue share)</h2>
          {stats.courses.length === 0 ? (
            <p className="text-gray-400">No course earnings yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.courses.map(course => (
                <div key={course.id} className="flex justify-between items-center border-b border-indigo-500/20 pb-3">
                  <div>
                    <p className="font-medium text-white">{course.title}</p>
                    <p className="text-xs text-indigo-300 mt-0.5">{course.students} students enrolled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total: ₹{course.revenue}</p>
                    <p className="font-bold text-indigo-400">My Share: ₹{(course.revenue * 0.7).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs mt-4 text-gray-400">💰 Revenue split: 70% instructor, 30% platform fee. Payouts processed monthly.</p>
        </div>
        
        <button className="px-6 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
          Request Payout
        </button>
      </div>
    </Layout>
  );
}