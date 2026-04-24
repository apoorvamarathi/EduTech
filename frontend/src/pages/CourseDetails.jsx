// frontend/src/pages/CourseDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourse({
        id: parseInt(id),
        title: 'React - The Complete Guide',
        instructor: 'John Doe',
        price: 49,
        description: 'Learn React from scratch, build real apps, and master hooks, context, and performance.',
        lessons: ['Introduction', 'Components & Props', 'State & Hooks', 'Effects & API Calls'],
        duration: '12 hours',
        students: 1234,
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleEnroll = () => {
    // Add to cart logic
    navigate('/cart');
  };

  if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>{course.title}</h1>
        <div className="flex gap-4 text-sm" style={{ color: 'var(--text)' }}>
          <span>👨‍🏫 {course.instructor}</span>
          <span>⏱️ {course.duration}</span>
          <span>👥 {course.students} students</span>
        </div>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-h)' }}>Description</h2>
          <p style={{ color: 'var(--text)' }}>{course.description}</p>
        </div>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-h)' }}>Course Content</h2>
          <ul className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <li key={idx} className="flex items-center gap-2" style={{ color: 'var(--text)' }}>📘 {lesson}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center p-6 rounded-xl" style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
          <div>
            <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>${course.price}</span>
            <span className="text-sm ml-2" style={{ color: 'var(--text)' }}>One-time payment</span>
          </div>
          <button onClick={handleEnroll} className="px-6 py-2 rounded-lg font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Enroll Now</button>
        </div>
      </div>
    </Layout>
  );
}