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
        <h1 className="text-3xl font-bold">Pending Course Approvals</h1>
        {pendingCourses.length === 0 && <p>No pending courses.</p>}
        {pendingCourses.map(course => (
          <div key={course.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description.substring(0, 100)}...</p>
            <p>Instructor ID: {course.instructorId}</p>
            <div className="flex gap-3 mt-3">
              <button onClick={() => approveCourse(course.id)} className="px-4 py-1 rounded" style={{ background: 'green', color: 'white' }}>Approve</button>
              <button onClick={() => rejectCourse(course.id)} className="px-4 py-1 rounded" style={{ background: 'red', color: 'white' }}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}