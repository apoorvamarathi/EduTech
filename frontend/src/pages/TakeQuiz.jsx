
// frontend/src/pages/TakeQuiz.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await api.get(`/quizzes/${id}`);
        setQuiz(data);
        setTimeLeft(30 * 60);
      } catch (error) {
        console.error('Error fetching quiz', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted || !quiz) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz]);

  const handleAnswer = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    
    const formattedAnswers = quiz.questions.map(q => answers[q._id] !== undefined ? answers[q._id] : -1);

    try {
      const { data } = await api.post(`/quizzes/${id}/submit`, { answers: formattedAnswers });
      navigate(`/quiz-result/${quiz._id}`, { 
        state: { 
          score: data.percentage, 
          passed: data.passed, 
          totalQuestions: quiz.questions.length, 
          correct: data.score 
        } 
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting quiz');
      setSubmitted(false);
    }
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading quiz...</div></Layout>;
  if (!quiz) return <Layout><div className="text-center py-20 text-white">Quiz not found</div></Layout>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-white">📝 {quiz.title}</h1>
          <div className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <span className="text-indigo-300">⏱️ Time left: </span>
            <span className="text-white font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-indigo-300">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span className="text-indigo-300">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0F172A]">
            <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Questions - Single question at a time for better UX */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="font-semibold mb-4 text-white text-lg">
              {currentQuestion + 1}. {quiz.questions[currentQuestion].questionText}
            </p>
            <div className="space-y-3">
              {quiz.questions[currentQuestion].options.map((opt, optIdx) => {
                const qId = quiz.questions[currentQuestion]._id;
                return (
                  <label 
                    key={optIdx} 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      answers[qId] === optIdx 
                        ? 'bg-indigo-500/20 border border-indigo-500/50' 
                        : 'bg-[#0F172A]/50 border border-indigo-500/20 hover:border-indigo-500/40'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`q${qId}`} 
                      checked={answers[qId] === optIdx} 
                      onChange={() => handleAnswer(qId, optIdx)} 
                      className="accent-indigo-500 w-4 h-4"
                    />
                    <span className="text-gray-300">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <button 
              onClick={() => setCurrentQuestion(prev => prev - 1)} 
              className="flex-1 py-2 rounded-lg font-medium border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
            >
              ← Previous
            </button>
          )}
          {currentQuestion < quiz.questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestion(prev => prev + 1)} 
              className="flex-1 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Next →
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              disabled={submitted}
              className="flex-1 py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 shadow-lg shadow-green-500/20"
            >
              {submitted ? 'Submitting...' : '✓ Submit Quiz'}
            </button>
          )}
        </div>

        {/* Answer Status Indicator */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          {quiz.questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                answers[q._id] !== undefined
                  ? 'bg-green-500 text-white'
                  : currentQuestion === idx
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#0F172A] text-gray-400 border border-indigo-500/30 hover:border-indigo-500'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}