// // frontend/src/pages/CourseLearning.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function CourseLearning() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [completedLessons, setCompletedLessons] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [quizAvailable, setQuizAvailable] = useState(false);
//   const [quizTaken, setQuizTaken] = useState(false);

//   useEffect(() => {
//     // Fetch course data (mock)
//     setTimeout(() => {
//       const mockCourse = {
//         id: parseInt(courseId),
//         title: 'React - The Complete Guide',
//         lessons: [
//           { id: 1, title: 'Introduction to React', videoUrl: '#' },
//           { id: 2, title: 'Components & Props', videoUrl: '#' },
//           { id: 3, title: 'State and Hooks', videoUrl: '#' },
//           { id: 4, title: 'Building a Real App', videoUrl: '#' },
//         ],
//       };
//       setCourse(mockCourse);
//       // Load saved progress
//       const saved = localStorage.getItem(`completed_${courseId}`);
//       if (saved) {
//         const completed = JSON.parse(saved);
//         setCompletedLessons(completed);
//         const prog = (completed.length / mockCourse.lessons.length) * 100;
//         setProgress(prog);
//         if (prog === 100) setQuizAvailable(true);
//       }
//       // Check if quiz already passed
//       const quizResult = localStorage.getItem(`quizResult_${courseId}`);
//       if (quizResult) {
//         const result = JSON.parse(quizResult);
//         if (result.passed) setQuizTaken(true);
//       }
//     }, 500);
//   }, [courseId]);

//   const markLessonComplete = (lessonId) => {
//     if (completedLessons.includes(lessonId)) return;
//     const newCompleted = [...completedLessons, lessonId];
//     setCompletedLessons(newCompleted);
//     localStorage.setItem(`completed_${courseId}`, JSON.stringify(newCompleted));
//     const prog = (newCompleted.length / course.lessons.length) * 100;
//     setProgress(prog);
//     if (prog === 100) {
//       setQuizAvailable(true);
//       alert('You have completed all lessons! You can now take the quiz to earn your certificate.');
//     }
//   };

//   const handleTakeQuiz = () => {
//     navigate(`/quiz/${courseId}`);
//   };

//   if (!course) return <Layout><div className="text-center py-20">Loading course...</div></Layout>;

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>{course.title}</h1>
//         <div className="w-full h-2 rounded-full bg-gray-200">
//           <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'var(--accent)' }}></div>
//         </div>
//         <p className="text-sm">{progress}% complete</p>

//         <div className="space-y-3">
//           {course.lessons.map(lesson => (
//             <div key={lesson.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//               <div>
//                 <h3 className="font-semibold">{lesson.title}</h3>
//                 {completedLessons.includes(lesson.id) && <span className="text-xs text-green-600">✓ Completed</span>}
//               </div>
//               {!completedLessons.includes(lesson.id) ? (
//                 <button onClick={() => markLessonComplete(lesson.id)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Mark Complete</button>
//               ) : (
//                 <button disabled className="px-3 py-1 rounded-lg text-sm opacity-50" style={{ background: 'var(--accent)', color: 'white' }}>Completed</button>
//               )}
//             </div>
//           ))}
//         </div>

//         {quizAvailable && !quizTaken && (
//           <button onClick={handleTakeQuiz} className="w-full py-3 rounded-xl font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Take Final Quiz →</button>
//         )}
//         {quizTaken && (
//           <div className="text-center p-4 rounded-xl" style={{ background: 'var(--accent-bg)' }}>
//             <p>✅ You have already passed the quiz and earned your certificate!</p>
//             <Link to="/my-certificates" className="inline-block mt-2 underline" style={{ color: 'var(--accent)' }}>View Certificate</Link>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


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

  // Load course and enrollment data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data: courseData } = await api.get(`/courses/${courseId}`);
        setCourse(courseData);
        if (courseData.lessons && courseData.lessons.length > 0) {
          setActiveLesson(courseData.lessons[0]);
        }

        // Fetch quiz for this course
        const { data: quizzes } = await api.get(`/quizzes/course/${courseId}`);
        if (quizzes.length > 0) setQuizId(quizzes[0]._id);
        
        // Fetch certificate for this course
        const { data: certs } = await api.get('/certificates/my');
        const courseCert = certs.find(c => (c.course?._id || c.course) === courseData._id);
        if (courseCert) setCertId(courseCert._id);

        // Let's get the enrollment to get the progress
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
    
    // Calculate new progress
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

  if (loading) return <Layout><div className="text-center py-20">Loading course...</div></Layout>;
  if (!course) return <Layout><div className="text-center py-20">Course not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>{course.title}</h1>
        
        <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full" style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%`, background: 'var(--accent)' }}></div>
        </div>
        <p className="text-sm">{completedLessons.length}/{course.lessons.length} lessons completed</p>

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
                  <div className="flex items-center justify-center w-full h-full text-white">
                    <p>No video URL provided for this lesson.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl aspect-video bg-gray-800 flex items-center justify-center text-white">
                <p>Select a lesson to start learning.</p>
              </div>
            )}
            {activeLesson && (
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{activeLesson.title}</h2>
                  {certId && (
                    <Link to="/my-certificates" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>🎓 View Certificate</Link>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: 'var(--text)' }}>Simulation Progress:</span>
                    <select onChange={(e) => updateVideoProgress(activeLesson._id, parseInt(e.target.value))} value={videoProgress[activeLesson._id] || 0} className="text-sm p-1 rounded border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                      <option value="0">0%</option>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                      <option value="75">75%</option>
                      <option value="100">100%</option>
                    </select>
                  </div>
                  {!completedLessons.includes(activeLesson._id) && (
                     <button onClick={() => markLessonComplete(activeLesson._id)} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Mark as Complete</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Playlist Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-h)' }}>Course Content</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson._id);
                const isActive = activeLesson?._id === lesson._id;
                
                return (
                  <div 
                    key={lesson._id} 
                    onClick={() => setActiveLesson(lesson)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'ring-2' : ''}`}
                    style={{ 
                      background: isActive ? 'var(--accent-bg)' : 'var(--bg)', 
                      border: '1px solid var(--border)',
                      borderColor: isActive ? 'var(--accent)' : 'var(--border)'
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{idx + 1}.</span>
                        <h4 className={`font-medium text-sm ${isActive ? 'text-[var(--accent)]' : ''}`} style={{ color: isActive ? 'var(--accent)' : 'var(--text-h)' }}>
                          {lesson.title}
                        </h4>
                      </div>
                      {isCompleted && <span className="text-green-500 text-sm">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz section */}
            <div className="p-4 rounded-xl mt-4 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h4 className="font-semibold mb-2">📋 Final Quiz</h4>
              {certId ? (
                <div className="space-y-2">
                  <p className="text-sm text-green-600 font-medium">✅ You have passed the quiz!</p>
                  <Link to="/my-certificates" className="block w-full py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>View Certificate</Link>
                </div>
              ) : (
                <button onClick={handleTakeQuiz} className="w-full py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Take Quiz</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

