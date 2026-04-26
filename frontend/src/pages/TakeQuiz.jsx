// frontend/src/pages/TakeQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Mock quiz data
    const mockQuiz = {
      id: parseInt(id),
      title: 'React Basics Quiz',
      duration: 30, // minutes
      passingScore: 70,
      questions: [
        { id: 1, text: 'What is React?', options: ['Library', 'Framework', 'Language', 'Tool'], correct: 0 },
        { id: 2, text: 'What hook is used for side effects?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correct: 1 },
        { id: 3, text: 'JSX allows mixing HTML with ___?', options: ['CSS', 'JavaScript', 'Python', 'Java'], correct: 1 },
      ]
    };
    setQuiz(mockQuiz);
    setTimeLeft(mockQuiz.duration * 60);
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
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
  }, [timeLeft, submitted]);

  const handleAnswer = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    
    // Calculate score
    let correct = 0;
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    const percentage = (correct / quiz.questions.length) * 100;
    const passed = percentage >= quiz.passingScore;

    // --- Start of added attempt tracking ---
    const attempt = {
      date: new Date().toISOString(),
      score: percentage,
      passed,
      answers
    };
    // Get existing attempts for this quiz from localStorage
    const existingAttempts = localStorage.getItem(`quizAttempts_${quiz.id}`);
    const attempts = existingAttempts ? JSON.parse(existingAttempts) : [];
    attempts.push(attempt);
    localStorage.setItem(`quizAttempts_${quiz.id}`, JSON.stringify(attempts));
    // --- End of added attempt tracking ---

    // Save result for quick access (kept for backward compatibility)
    const result = { quizId: quiz.id, score: percentage, passed, answers };
    localStorage.setItem(`quizResult_${quiz.id}`, JSON.stringify(result));
    
    setSubmitted(true);
    navigate(`/quiz-result/${quiz.id}`, { state: { score: percentage, passed, totalQuestions: quiz.questions.length, correct } });
  };

  if (!quiz) return <Layout><div className="text-center py-20">Loading quiz...</div></Layout>;

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
            <div key={q.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-3" style={{ color: 'var(--text-h)' }}>{idx+1}. {q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name={`q${q.id}`} checked={answers[q.id] === optIdx} onChange={() => handleAnswer(q.id, optIdx)} />
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