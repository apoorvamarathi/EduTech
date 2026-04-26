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

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [videoProgress, setVideoProgress] = useState({});
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  // Load course data
  useEffect(() => {
    setTimeout(() => {
      const mockCourse = {
        id: parseInt(courseId),
        title: 'React - The Complete Guide',
        lessons: [
          { id: 1, title: 'Introduction to React', videoUrl: '#', duration: 120 },
          { id: 2, title: 'Components & Props', videoUrl: '#', duration: 180 },
          { id: 3, title: 'State and Hooks', videoUrl: '#', duration: 200 },
          { id: 4, title: 'Building a Real App', videoUrl: '#', duration: 300 },
        ],
        assignment: { id: 1, title: 'Build a Todo App', description: 'Create a todo app with React', dueDate: '2025-05-15' },
      };
      setCourse(mockCourse);

      const savedCompleted = localStorage.getItem(`completed_${courseId}`);
      if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted));
      const savedVideo = localStorage.getItem(`videoProgress_${courseId}`);
      if (savedVideo) setVideoProgress(JSON.parse(savedVideo));
      const savedAssignment = localStorage.getItem(`assignment_${courseId}`);
      if (savedAssignment) setAssignmentSubmitted(JSON.parse(savedAssignment));
      const savedQuizAttempts = localStorage.getItem(`quizAttempts_${courseId}`);
      if (savedQuizAttempts) setQuizAttempts(JSON.parse(savedQuizAttempts));
      const savedForum = localStorage.getItem(`forum_${courseId}`);
      if (savedForum) setForumPosts(JSON.parse(savedForum));
      
      setLoading(false);
    }, 500);
  }, [courseId]);

  // Save progress whenever it changes
  useEffect(() => {
    if (!course) return;
    localStorage.setItem(`completed_${courseId}`, JSON.stringify(completedLessons));
    localStorage.setItem(`videoProgress_${courseId}`, JSON.stringify(videoProgress));
    localStorage.setItem(`assignment_${courseId}`, JSON.stringify(assignmentSubmitted));
    localStorage.setItem(`quizAttempts_${courseId}`, JSON.stringify(quizAttempts));
    localStorage.setItem(`forum_${courseId}`, JSON.stringify(forumPosts));
  }, [completedLessons, videoProgress, assignmentSubmitted, quizAttempts, forumPosts, courseId, course]);

  const isLessonLocked = (lessonIndex) => {
    if (lessonIndex === 0) return false;
    return !completedLessons.includes(course.lessons[lessonIndex - 1].id);
  };

  const markLessonComplete = (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    setCompletedLessons(prev => [...prev, lessonId]);
  };

  const updateVideoProgress = (lessonId, percentage) => {
    setVideoProgress(prev => ({ ...prev, [lessonId]: percentage }));
    if (percentage >= 90 && !completedLessons.includes(lessonId)) {
      markLessonComplete(lessonId);
      alert(`Lesson completed! Progress: ${percentage}% watched.`);
    }
  };

  const handleAssignmentSubmit = () => {
    const fileInput = document.getElementById('assignmentFile');
    if (fileInput && fileInput.files.length > 0) {
      setAssignmentSubmitted(true);
      alert('Assignment submitted successfully!');
    } else {
      alert('Please select a file to submit.');
    }
  };

  const handleTakeQuiz = () => {
    if (completedLessons.length !== course.lessons.length) {
      alert('Please complete all lessons before taking the quiz.');
      return;
    }
    if (!assignmentSubmitted && course.assignment) {
      alert('Please submit the assignment before taking the quiz.');
      return;
    }
    navigate(`/quiz/${courseId}`);
  };

  const checkAllCompleted = () => {
    if (!course) return; // <-- ADD THIS GUARD
    const lessonsDone = completedLessons.length === course.lessons.length;
    const assignmentDone = !course.assignment || assignmentSubmitted;
    const quizPassed = quizAttempts.some(attempt => attempt.passed === true);
    if (lessonsDone && assignmentDone && quizPassed) {
      const certificate = {
        id: Date.now(),
        courseTitle: course.title,
        studentName: JSON.parse(localStorage.getItem('userInfo') || '{"name":"Student"}').name,
        issueDate: new Date().toISOString().split('T')[0],
        credentialId: `EDU-${courseId}-${Date.now()}`,
        grade: 'A',
        score: quizAttempts.find(a => a.passed)?.score || '100%',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=EDU-${courseId}`,
      };
      const existingCerts = localStorage.getItem('myCertificates');
      const certs = existingCerts ? JSON.parse(existingCerts) : [];
      if (!certs.some(c => c.courseTitle === course.title)) {
        certs.push(certificate);
        localStorage.setItem('myCertificates', JSON.stringify(certs));
        alert('🎉 Congratulations! You have completed the course and earned a certificate!');
      }
    }
  };

  // FIX: add 'course' to dependency array
  useEffect(checkAllCompleted, [course, completedLessons, assignmentSubmitted, quizAttempts]);

  const addForumPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: JSON.parse(localStorage.getItem('userInfo') || '{"name":"Student"}').name,
      content: newPost,
      replies: [],
      createdAt: new Date().toISOString(),
    };
    setForumPosts(prev => [...prev, post]);
    setNewPost('');
  };

  const addReply = (postId, replyText) => {
    if (!replyText.trim()) return;
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, { author: 'You', content: replyText, createdAt: new Date().toISOString() }]
        };
      }
      return post;
    }));
  };

  if (loading) return <Layout><div className="text-center py-20">Loading course...</div></Layout>;
  if (!course) return <Layout><div className="text-center py-20">Course not found</div></Layout>;

  const quizPassed = quizAttempts.some(a => a.passed);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>{course.title}</h1>
        
        <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full" style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%`, background: 'var(--accent)' }}></div>
        </div>
        <p className="text-sm">{completedLessons.length}/{course.lessons.length} lessons completed</p>

        {/* Lessons */}
        <div className="space-y-3">
          {course.lessons.map((lesson, idx) => {
            const locked = isLessonLocked(idx);
            const watchPercent = videoProgress[lesson.id] || 0;
            return (
              <div key={lesson.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{lesson.title}</h3>
                    {locked && <p className="text-xs" style={{ color: 'var(--text)' }}>🔒 Complete previous lesson to unlock</p>}
                    {!locked && watchPercent > 0 && <p className="text-xs">Watched: {watchPercent}%</p>}
                  </div>
                  {!locked && (
                    <div className="flex items-center gap-3">
                      <select onChange={(e) => updateVideoProgress(lesson.id, parseInt(e.target.value))} value={watchPercent} className="text-sm p-1 rounded">
                        <option value="0">0%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                      </select>
                      {completedLessons.includes(lesson.id) && <span className="text-green-600">✓ Completed</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Assignment */}
        {course.assignment && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h2 className="text-xl font-semibold mb-2">📝 Assignment</h2>
            <p><strong>{course.assignment.title}</strong></p>
            <p className="text-sm">{course.assignment.description}</p>
            <p className="text-xs">Due: {course.assignment.dueDate}</p>
            {!assignmentSubmitted ? (
              <div className="mt-3">
                <input type="file" id="assignmentFile" className="mb-2" />
                <button onClick={handleAssignmentSubmit} className="px-4 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Submit Assignment</button>
              </div>
            ) : (
              <p className="text-green-600 mt-2">✅ Assignment submitted successfully!</p>
            )}
          </div>
        )}

        {/* Quiz section */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-2">📋 Final Quiz</h2>
          <p>Test your knowledge. Passing score: 70%</p>
          {!quizPassed ? (
            <button onClick={handleTakeQuiz} className="mt-3 px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Take Quiz</button>
          ) : (
            <p className="text-green-600 mt-2">✅ Quiz passed! Certificate will be generated.</p>
          )}
          {quizAttempts.length > 0 && (
            <div className="mt-2 text-sm">
              <p>Previous attempts: {quizAttempts.length}</p>
              {quizAttempts.map((attempt, i) => (
                <p key={i}>Attempt {i+1}: {attempt.score}% {attempt.passed ? '(Passed)' : '(Failed)'}</p>
              ))}
            </div>
          )}
        </div>

        {/* Discussion Forum */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-2">💬 Discussion Forum</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {forumPosts.length === 0 && <p className="text-sm">No discussions yet. Be the first to ask a question.</p>}
            {forumPosts.map(post => (
              <div key={post.id} className="p-3 rounded-lg" style={{ background: 'var(--code-bg)' }}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{post.author}</span>
                  <span className="text-xs">{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-1">{post.content}</p>
                <div className="mt-2 pl-4 border-l-2" style={{ borderColor: 'var(--border)' }}>
                  {post.replies.map((reply, idx) => (
                    <div key={idx} className="text-sm mt-1">
                      <span className="font-semibold">{reply.author}:</span> {reply.content}
                    </div>
                  ))}
                  <input type="text" placeholder="Write a reply..." className="w-full mt-2 p-1 text-sm rounded" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }} onKeyPress={(e) => { if (e.key === 'Enter') addReply(post.id, e.target.value); e.target.value = ''; }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input type="text" value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Ask a question or start a discussion..." className="flex-1 p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
            <button onClick={addForumPost} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Post</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

