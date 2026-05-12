


// frontend/src/pages/CourseDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (err) {
        console.error('Error fetching course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    // Check if course already in cart
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingItem = cart.find(item => item.id === course._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: course._id,
        title: course.title,
        price: course.price,
        quantity: 1,
        thumbnail: course.thumbnail,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading...</div></Layout>;
  if (!course) return <Layout><div className="text-center py-20 text-white">Course not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        <div className="flex gap-4 text-sm text-indigo-300">
          <span>👨‍🏫 {course.instructor?.name || 'Instructor'}</span>
          <span>⏱️ {course.duration || 'Flexible'}</span>
          <span>👥 {course.studentsEnrolled?.length || 0} students</span>
        </div>
        
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <h2 className="text-xl font-semibold mb-2 text-white">Description</h2>
          <p className="text-gray-300">{course.description}</p>
        </div>
        
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <h2 className="text-xl font-semibold mb-3 text-white">Course Content</h2>
          <ul className="space-y-2">
            {course.lessons && course.lessons.map((lesson, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-300">📘 {lesson.title}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
          <div>
            <span className="text-2xl font-bold text-indigo-400">${course.price}</span>
            <span className="text-sm ml-2 text-gray-400">One-time payment</span>
          </div>
          <button 
            onClick={handleEnroll} 
            className="px-6 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </Layout>
  );
}