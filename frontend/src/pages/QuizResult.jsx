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
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="text-6xl">{passed ? '🏆' : '😢'}</div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>{passed ? 'Congratulations!' : 'Not this time'}</h1>
        <p className="text-lg" style={{ color: 'var(--text)' }}>Your score: <strong>{score}%</strong> ({correct}/{totalQuestions} correct)</p>
        <p>{passed ? 'You passed! A certificate will be issued shortly.' : `Passing score is 70%. Keep learning and try again.`}</p>
        <div className="flex gap-4 justify-center">
          <Link to="/quizzes" className="px-6 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--text-h)' }}>Back to Quizzes</Link>
          {passed && <Link to="/my-certificates" className="px-6 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>View Certificate</Link>}
        </div>
      </div>
    </Layout>
  );
}