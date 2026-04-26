// frontend/src/pages/QuizzesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock – replace with API call: GET /api/quizzes?studentId=...
    setTimeout(() => {
      setQuizzes([
        { id: 1, courseTitle: 'React Mastery', totalQuestions: 20, duration: 30, passingScore: 70, attemptStatus: 'not_started' },
        { id: 2, courseTitle: 'Node.js API', totalQuestions: 15, duration: 25, passingScore: 65, attemptStatus: 'completed', score: 85 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Quizzes</h1>
        {loading && <div className="text-center py-10">Loading...</div>}
        {!loading && quizzes.length === 0 && <p style={{ color: 'var(--text)' }}>No quizzes available.</p>}
        <div className="grid gap-4">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{quiz.courseTitle}</h3>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{quiz.totalQuestions} questions · {quiz.duration} mins · Passing: {quiz.passingScore}%</p>
                {quiz.attemptStatus === 'completed' && <p className="text-sm" style={{ color: 'var(--accent)' }}>Your score: {quiz.score}%</p>}
              </div>
              {quiz.attemptStatus === 'not_started' ? (
                <Link to={`/quiz/${quiz.id}`} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Start Quiz</Link>
              ) : (
                <span className="text-sm" style={{ color: 'var(--text)' }}>✓ Completed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}