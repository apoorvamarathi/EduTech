// frontend/src/pages/InstructorCourses.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('instructorCourses');
    const instructorId = JSON.parse(localStorage.getItem('userInfo'))._id;
    const allCourses = stored ? JSON.parse(stored) : [];
    const myCourses = allCourses.filter(c => c.instructorId === instructorId);
    setCourses(myCourses);
    setLoading(false);
  }, []);

  const deleteCourse = (id) => {
    if (window.confirm('Delete this course?')) {
      const updated = courses.filter(c => c.id !== id);
      // Update localStorage
      const all = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
      const filteredAll = all.filter(c => c.id !== id);
      localStorage.setItem('instructorCourses', JSON.stringify(filteredAll));
      setCourses(updated);
      alert('Course deleted');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Courses</h1>
          <Link to="/create-course" className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>+ New Course</Link>
        </div>
        {loading && <div className="text-center py-10">Loading...</div>}
        {!loading && courses.length === 0 && (
          <div className="text-center py-12 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p>You haven't created any courses yet.</p>
            <Link to="/create-course" className="inline-block mt-3 underline" style={{ color: 'var(--accent)' }}>Create your first course</Link>
          </div>
        )}
        <div className="grid gap-4">
          {courses.map(course => (
            <div key={course.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-sm">Category: {course.category}</p>
                  <p className="text-sm">Price: {course.isFree ? 'Free' : `₹${course.price}`}</p>
                  <p className="text-xs">Status: <span style={{ color: course.status === 'approved' ? 'green' : 'orange' }}>{course.status}</span></p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit-course/${course.id}`} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Edit</Link>
                  <button onClick={() => deleteCourse(course.id)} className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'red', color: 'red' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
