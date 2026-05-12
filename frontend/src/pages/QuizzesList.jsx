
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
            attemptStatus: 'not_started'
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
        <div>
          <h1 className="text-3xl font-bold text-white">My Quizzes</h1>
          <p className="text-indigo-300 mt-1">Test your knowledge and earn certificates</p>
        </div>
        
        {loading && <div className="text-center py-20 text-white">Loading quizzes...</div>}
        
        {!loading && quizzes.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-gray-400">No quizzes available for your enrolled courses.</p>
            <Link to="/courses" className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 transition underline">
              Browse Courses →
            </Link>
          </div>
        )}
        
        <div className="grid gap-4">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="flex justify-between items-center p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div>
                <h3 className="font-semibold text-white text-lg">{quiz.courseTitle}</h3>
                <p className="text-sm text-indigo-300 mt-1">📝 {quiz.title}</p>
                <p className="text-xs text-gray-400 mt-1">{quiz.totalQuestions} questions · Passing: {quiz.passingScore}%</p>
              </div>
              {quiz.attemptStatus === 'not_started' ? (
                <Link 
                  to={`/quiz/${quiz._id}`} 
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                >
                  Start Quiz →
                </Link>
              ) : (
                <span className="text-sm text-green-400">✓ Completed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
