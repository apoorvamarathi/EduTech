// // frontend/src/pages/AdminCourseApproval.jsx
// import React, { useState, useEffect } from 'react';
// import Layout from '../components/Layout';

// export default function AdminCourseApproval() {
//   const [pendingCourses, setPendingCourses] = useState([]);
//   useEffect(() => {
//     const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
//     setPendingCourses(all.filter(c => c.status === 'pending'));
//   }, []);

//   const approveCourse = (id) => {
//     const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
//     const updated = all.map(c => c.id === id ? { ...c, status: 'approved' } : c);
//     localStorage.setItem('instructorCourses', JSON.stringify(updated));
//     setPendingCourses(updated.filter(c => c.status === 'pending'));
//     alert('Course approved and published.');
//   };

//   const rejectCourse = (id) => {
//     if (window.confirm('Reject this course? It will be removed.')) {
//       const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
//       const remaining = all.filter(c => c.id !== id);
//       localStorage.setItem('instructorCourses', JSON.stringify(remaining));
//       setPendingCourses(remaining.filter(c => c.status === 'pending'));
//       alert('Course rejected and deleted.');
//     }
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">Pending Course Approvals</h1>
//         {pendingCourses.length === 0 && <p>No pending courses.</p>}
//         {pendingCourses.map(course => (
//           <div key={course.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//             <h3 className="text-xl font-semibold">{course.title}</h3>
//             <p>{course.description.substring(0, 100)}...</p>
//             <p>Instructor ID: {course.instructorId}</p>
//             <div className="flex gap-3 mt-3">
//               <button onClick={() => approveCourse(course.id)} className="px-4 py-1 rounded" style={{ background: 'green', color: 'white' }}>Approve</button>
//               <button onClick={() => rejectCourse(course.id)} className="px-4 py-1 rounded" style={{ background: 'red', color: 'white' }}>Reject</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }


// frontend/src/pages/AdminCourseApproval.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function AdminCourseApproval() {
  const [pendingCourses, setPendingCourses] = useState([]);
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    setPendingCourses(all.filter(c => c.status === 'pending'));
  }, []);

  const approveCourse = (id) => {
    const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    const updated = all.map(c => c.id === id ? { ...c, status: 'approved' } : c);
    localStorage.setItem('instructorCourses', JSON.stringify(updated));
    setPendingCourses(updated.filter(c => c.status === 'pending'));
    alert('Course approved and published.');
  };

  const rejectCourse = (id) => {
    if (window.confirm('Reject this course? It will be removed.')) {
      const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
      const remaining = all.filter(c => c.id !== id);
      localStorage.setItem('instructorCourses', JSON.stringify(remaining));
      setPendingCourses(remaining.filter(c => c.status === 'pending'));
      alert('Course rejected and deleted.');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Course Approvals</h1>
          <p className="text-gray-500 mt-1">Review and publish instructor courses</p>
        </div>

        {pendingCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-gray-500">No pending courses at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {pendingCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition hover:shadow-md">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mt-1">{course.description.substring(0, 120)}...</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="text-gray-500">Instructor ID: {course.instructorId}</span>
                      <span className="text-gray-500">Price: {course.isFree ? 'Free' : `₹${course.price}`}</span>
                      <span className="text-gray-500">Lessons: {course.lessons?.length || 0}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveCourse(course.id)}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectCourse(course.id)}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}