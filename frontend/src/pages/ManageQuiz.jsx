
// frontend/src/pages/ManageQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function ManageQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState({ title: '', passingScore: 70, questions: [] });
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: courseData } = await api.get(`/courses/${courseId}`);
        setCourse(courseData);
        
        const { data: quizzes } = await api.get(`/quizzes/course/${courseId}`);
        if (quizzes.length > 0) {
          setQuiz(quizzes[0]);
        }
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const handleAddQuestion = () => {
    if (!newQuestion.questionText) return;
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    setNewQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const handleRemoveQuestion = (idx) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = async () => {
    try {
      if (quiz._id) {
        await api.post('/quizzes', { ...quiz, course: courseId });
      } else {
        await api.post('/quizzes', { ...quiz, course: courseId });
      }
      alert('Quiz saved successfully!');
      navigate('/instructor');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving quiz');
    }
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Manage Quiz: {course?.title}</h1>
        
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Quiz Title</label>
              <input 
                type="text" 
                value={quiz.title} 
                onChange={e => setQuiz({...quiz, title: e.target.value})} 
                className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-400" 
                placeholder="e.g., Final Certification Quiz" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Passing Score (%)</label>
              <input 
                type="number" 
                value={quiz.passingScore} 
                onChange={e => setQuiz({...quiz, passingScore: e.target.value})} 
                className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Questions</h2>
          {quiz.questions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-xl relative bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <button onClick={() => handleRemoveQuestion(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition">Remove</button>
              <p className="font-medium text-white">{idx + 1}. {q.questionText}</p>
              <ul className="mt-2 space-y-1">
                {q.options.map((opt, oIdx) => (
                  <li key={oIdx} className={`text-sm ${oIdx === q.correctAnswer ? 'text-emerald-400 font-bold' : 'text-gray-300'}`}>
                    {opt} {oIdx === q.correctAnswer && ' (Correct)'}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="p-4 rounded-xl border-2 border-dashed border-indigo-500/30 bg-[#1E293B]/50">
            <h3 className="font-semibold text-white mb-3">Add New Question</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                value={newQuestion.questionText} 
                onChange={e => setNewQuestion({...newQuestion, questionText: e.target.value})} 
                className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-400" 
                placeholder="Question Text" 
              />
              <div className="grid grid-cols-2 gap-2">
                {newQuestion.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={newQuestion.correctAnswer === oIdx} 
                      onChange={() => setNewQuestion({...newQuestion, correctAnswer: oIdx})} 
                      className="accent-indigo-500"
                    />
                    <input 
                      type="text" 
                      value={opt} 
                      onChange={e => {
                        const newOpts = [...newQuestion.options];
                        newOpts[oIdx] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOpts});
                      }} 
                      className="flex-1 p-2 text-sm rounded border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-400" 
                      placeholder={`Option ${oIdx + 1}`} 
                    />
                  </div>
                ))}
              </div>
              <button 
                onClick={handleAddQuestion} 
                className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Add Question to Quiz
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave} 
          className="w-full py-3 rounded-xl font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Save Quiz
        </button>
      </div>
    </Layout>
  );
}

