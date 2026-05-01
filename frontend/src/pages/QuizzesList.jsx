// frontend/src/pages/QuizzesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function QuizzesList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Fetch enrollments to get courses, then fetch quizzes for each
        const { data: dashboardData } = await api.get('/dashboard');
        const courses = dashboardData.courses || [];
        
        let allQuizzes = [];
        for (const course of courses) {
          const { data: courseQuizzes } = await api.get(`/quizzes/course/${course.id}`);
          allQuizzes = [...allQuizzes, ...courseQuizzes.map(q => ({
            _id: q._id,
            courseTitle: course.title,
            title: q.title,
            totalQuestions: q.questions.length,
            passingScore: q.passingScore,
            attemptStatus: 'not_started' // We would need attempt tracking in backend to know if completed
          }))];
        }
        setQuizzes(allQuizzes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Quizzes</h1>
        {loading && <div className="text-center py-10">Loading...</div>}
        {!loading && quizzes.length === 0 && <p style={{ color: 'var(--text)' }}>No quizzes available for your enrolled courses.</p>}
        <div className="grid gap-4">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{quiz.courseTitle} - {quiz.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{quiz.totalQuestions} questions · Passing: {quiz.passingScore}%</p>
                {quiz.attemptStatus === 'completed' && <p className="text-sm" style={{ color: 'var(--accent)' }}>Your score: {quiz.score}%</p>}
              </div>
              {quiz.attemptStatus === 'not_started' ? (
                <Link to={`/quiz/${quiz._id}`} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Start Quiz</Link>
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