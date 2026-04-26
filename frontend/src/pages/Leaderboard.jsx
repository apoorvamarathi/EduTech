// frontend/src/pages/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Leaderboard() {
  const { quizId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    // Mock leaderboard
    setLeaderboard([
      { rank: 1, name: 'Alice Johnson', score: 98, date: '2025-04-20' },
      { rank: 2, name: 'Bob Smith', score: 95, date: '2025-04-19' },
      { rank: 3, name: 'Charlie Lee', score: 92, date: '2025-04-18' },
    ]);
  }, [quizId]);
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Leaderboard</h1>
        <div className="space-y-2">
          {leaderboard.map(entry => (
            <div key={entry.rank} className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-4">
                <span className="font-bold w-8">{entry.rank}</span>
                <span>{entry.name}</span>
              </div>
              <div className="flex gap-6">
                <span>{entry.score}%</span>
                <span className="text-sm">{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}