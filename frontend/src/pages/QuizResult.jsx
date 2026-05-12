
// frontend/src/pages/QuizResult.jsx

import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function QuizResult() {
  const { id } = useParams();
  const location = useLocation();
  const { score, passed, totalQuestions, correct } = location.state || { score: 0, passed: false, totalQuestions: 0, correct: 0 };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="text-7xl">{passed ? '🏆' : '😢'}</div>
        <h1 className="text-3xl font-bold text-white">{passed ? 'Congratulations!' : 'Not this time'}</h1>
        <p className="text-lg text-gray-300">
          Your score: <strong className={passed ? 'text-green-400' : 'text-yellow-400'}>{score}%</strong> 
          <span className="text-gray-400"> ({correct}/{totalQuestions} correct)</span>
        </p>
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          {passed ? (
            <>
              <p className="text-green-400 mb-2">✓ You passed! A certificate will be issued shortly.</p>
              <div className="w-full bg-[#0F172A] rounded-full h-2 mt-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${score}%` }}></div>
              </div>
            </>
          ) : (
            <>
              <p className="text-yellow-400 mb-2">📚 Passing score is 70%. Keep learning and try again.</p>
              <div className="w-full bg-[#0F172A] rounded-full h-2 mt-3">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${score}%` }}></div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            to="/quizzes" 
            className="px-6 py-2 rounded-lg border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
          >
            Back to Quizzes
          </Link>
          {passed && (
            <Link 
              to="/my-certificates" 
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
            >
              View Certificate →
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}
