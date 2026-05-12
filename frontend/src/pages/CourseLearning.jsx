



// frontend/src/pages/CourseLearning.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [videoProgress, setVideoProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [certId, setCertId] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data: courseData } = await api.get(`/courses/${courseId}`);
        setCourse(courseData);
        if (courseData.lessons && courseData.lessons.length > 0) {
          setActiveLesson(courseData.lessons[0]);
        }

        const { data: quizzes } = await api.get(`/quizzes/course/${courseId}`);
        if (quizzes.length > 0) setQuizId(quizzes[0]._id);
        
        const { data: certs } = await api.get('/certificates/my');
        const courseCert = certs.find(c => (c.course?._id || c.course) === courseData._id);
        if (courseCert) setCertId(courseCert._id);

        const { data: dashboardData } = await api.get('/dashboard');
        const enrollments = dashboardData.courses || [];
        const currentEnrollment = enrollments.find(e => e.id === courseData._id);
        if (currentEnrollment) {
          setEnrollment(currentEnrollment);
          const lessonsToComplete = Math.floor((currentEnrollment.progress / 100) * courseData.lessons.length);
          setCompletedLessons(courseData.lessons.slice(0, lessonsToComplete).map(l => l._id));
        }
      } catch (err) {
        console.error('Error fetching course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const markLessonComplete = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    
    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);
    
    const newProgress = Math.min(100, Math.floor((newCompleted.length / course.lessons.length) * 100));
    
    try {
      if (enrollment && enrollment.enrollmentId) {
        await api.put(`/enrollments/${enrollment.enrollmentId}/progress`, { progress: newProgress });
      }
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  };

  const updateVideoProgress = (lessonId, percentage) => {
    setVideoProgress(prev => ({ ...prev, [lessonId]: percentage }));
    if (percentage >= 90 && !completedLessons.includes(lessonId)) {
      markLessonComplete(lessonId);
    }
  };

  const handleTakeQuiz = () => {
    if (!quizId) {
      alert('This course does not have a quiz yet.');
      return;
    }
    if (completedLessons.length !== course.lessons.length) {
      alert('Please complete all lessons before taking the quiz.');
      return;
    }
    navigate(`/quiz/${quizId}`);
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading course...</div></Layout>;
  if (!course) return <Layout><div className="text-center py-20 text-white">Course not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        
        <div className="w-full h-2 rounded-full bg-[#1E293B]">
          <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%` }}></div>
        </div>
        <p className="text-sm text-indigo-300">{completedLessons.length}/{course.lessons.length} lessons completed</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content Area (Video Player) */}
          <div className="md:col-span-2 space-y-4">
            {activeLesson ? (
              <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video relative">
                {activeLesson.content ? (
                  <iframe 
                    src={activeLesson.content.includes('watch?v=') ? activeLesson.content.replace('watch?v=', 'embed/') : activeLesson.content} 
                    className="w-full h-full absolute inset-0 border-0"
                    allowFullScreen
                    title={activeLesson.title}
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <p>No video URL provided for this lesson.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl aspect-video bg-[#1E293B] flex items-center justify-center text-gray-400">
                <p>Select a lesson to start learning.</p>
              </div>
            )}
            {activeLesson && (
              <div className="p-4 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">{activeLesson.title}</h2>
                  {certId && (
                    <Link to="/my-certificates" className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-500/20 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/30 transition">
                      🎓 View Certificate
                    </Link>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Progress:</span>
                    <select 
                      onChange={(e) => updateVideoProgress(activeLesson._id, parseInt(e.target.value))} 
                      value={videoProgress[activeLesson._id] || 0} 
                      className="text-sm p-1 rounded border bg-[#0F172A] border-indigo-500/30 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="0">0%</option>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                      <option value="75">75%</option>
                      <option value="100">100%</option>
                    </select>
                  </div>
                  {!completedLessons.includes(activeLesson._id) && (
                    <button onClick={() => markLessonComplete(activeLesson._id)} className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition">
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Playlist Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Course Content</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson._id);
                const isActive = activeLesson?._id === lesson._id;
                
                return (
                  <div 
                    key={lesson._id} 
                    onClick={() => setActiveLesson(lesson)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'ring-2 ring-indigo-500' : ''} bg-[#0F172A]/50 border border-indigo-500/20 hover:border-indigo-500/40`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{idx + 1}.</span>
                        <h4 className={`font-medium text-sm ${isActive ? 'text-indigo-400' : 'text-white'}`}>
                          {lesson.title}
                        </h4>
                      </div>
                      {isCompleted && <span className="text-green-400 text-sm">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz section */}
            <div className="p-4 rounded-xl mt-4 text-center bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <h4 className="font-semibold mb-2 text-white">📋 Final Quiz</h4>
              {certId ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-400 font-medium">✅ You have passed the quiz!</p>
                  <Link to="/my-certificates" className="block w-full py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition">View Certificate</Link>
                </div>
              ) : (
                <button onClick={handleTakeQuiz} className="w-full py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition">Take Quiz</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}