// frontend/src/pages/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get('/dashboard/leaderboard');
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Global Leaderboard</h1>
        <p className="text-sm text-gray-500">Based on certificates earned</p>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="space-y-2">
            {leaderboard.length === 0 && <p>No students have earned certificates yet.</p>}
            {leaderboard.map(entry => (
              <div key={entry.rank} className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-4">
                  <span className="font-bold w-8">{entry.rank}</span>
                  <span>{entry.name}</span>
                </div>
                <div className="flex gap-6">
                  <span>{entry.score} pts</span>
                  <span className="text-sm text-yellow-500 font-semibold">{entry.badges[0]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}