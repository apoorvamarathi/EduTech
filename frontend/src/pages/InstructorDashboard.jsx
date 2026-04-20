// frontend/src/pages/InstructorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        { id: 1, title: 'React for Beginners', students: 245, revenue: 2450, status: 'Published' },
        { id: 2, title: 'Advanced Node.js', students: 98, revenue: 1960, status: 'Draft' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Instructor Dashboard</h1>
            <p style={{ color: 'var(--text)' }}>Manage your courses and earnings</p>
          </div>
          <Link to="/courses/create" className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>+ New Course</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Students</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>343</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Revenue</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>$4,410</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Courses</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{courses.length}</p>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>My Courses</h2>
          {loading ? <div>Loading...</div> : (
            <div className="space-y-3">
              {courses.map(course => (
                <div key={course.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{course.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{course.students} students · ${course.revenue} revenue</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: course.status === 'Published' ? 'var(--accent-bg)' : 'var(--code-bg)', color: course.status === 'Published' ? 'var(--accent)' : 'var(--text)' }}>{course.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}