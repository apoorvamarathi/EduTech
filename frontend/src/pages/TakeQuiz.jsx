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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await api.get(`/quizzes/${id}`);
        setQuiz(data);
        setTimeLeft(30 * 60); // Default to 30 mins since the model didn't have duration.
      } catch (error) {
        console.error('Error fetching quiz', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || submitted || !quiz) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto-submit on timeout
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
    
    // Format answers array: array of selected option indices
    const formattedAnswers = quiz.questions.map(q => answers[q._id] !== undefined ? answers[q._id] : -1);

    try {
      const { data } = await api.post(`/quizzes/${id}/submit`, { answers: formattedAnswers });
      navigate(`/quiz-result/${quiz._id}`, { state: { score: data.percentage, passed: data.passed, totalQuestions: quiz.questions.length, correct: data.score } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting quiz');
    }
  };

  if (loading) return <Layout><div className="text-center py-20">Loading quiz...</div></Layout>;
  if (!quiz) return <Layout><div className="text-center py-20">Quiz not found</div></Layout>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{quiz.title}</h1>
          <div className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
            Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        <div className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div key={q._id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-3" style={{ color: 'var(--text-h)' }}>{idx+1}. {q.questionText}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name={`q${q._id}`} checked={answers[q._id] === optIdx} onChange={() => handleAnswer(q._id, optIdx)} />
                    <span style={{ color: 'var(--text)' }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="w-full py-3 rounded-xl font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Submit Quiz</button>
      </div>
    </Layout>
  );
}