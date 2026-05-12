

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

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-400';
    return 'text-indigo-300';
  };

  const getMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">🏆 Global Leaderboard</h1>
          <p className="text-indigo-300 mt-2">Top performers based on certificates earned</p>
        </div>
        
        {loading ? (
          <div className="text-center py-20 text-white">Loading leaderboard...</div>
        ) : (
          <div className="space-y-2">
            {leaderboard.length === 0 && (
              <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
                <p className="text-gray-400">No students have earned certificates yet.</p>
              </div>
            )}
            
            {leaderboard.map(entry => (
              <div 
                key={entry.rank} 
                className={`flex justify-between items-center p-4 rounded-xl transition-all hover:scale-[1.02] bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(entry.rank)} bg-indigo-500/10`}>
                    {getMedal(entry.rank)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{entry.name}</p>
                    <p className="text-xs text-gray-400">Student</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-indigo-400">{entry.score} pts</p>
                  {entry.badges && entry.badges[0] && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      🏅 {entry.badges[0]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}