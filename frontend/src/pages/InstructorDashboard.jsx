



// frontend/src/pages/InstructorCourses.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setCourses(data.courses || []);
      } catch (err) {
        console.error('Failed to fetch instructor courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (window.confirm('Delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        setCourses(courses.filter(c => c.id !== id));
        alert('Course deleted');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  const getStatusColor = (status) => {
    if (status === 'published') return 'text-green-400';
    if (status === 'pending') return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">My Courses</h1>
            <p className="text-indigo-300 mt-1">Manage and monitor your courses</p>
          </div>
          <Link to="/create-course" 
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
            + New Course
          </Link>
        </div>
        
        {loading && <div className="text-center py-20 text-white">Loading...</div>}
        
        {!loading && courses.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-gray-400">You haven't created any courses yet.</p>
            <Link to="/create-course" className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 transition underline">
              Create your first course →
            </Link>
          </div>
        )}
        
        <div className="grid gap-4">
          {courses.map(course => (
            <div key={course.id} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm">
                    <p className="text-indigo-300">👥 Students: {course.students || 0}</p>
                    <p className="text-indigo-300">💰 Revenue: ₹{course.revenue || 0}</p>
                  </div>
                  <p className="text-xs mt-1">
                    Status: <span className={getStatusColor(course.status)}>{course.status || 'draft'}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/manage-quiz/${course.id}`} 
                    className="px-3 py-1 rounded-lg text-sm bg-indigo-500/20 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/30 transition">
                    Manage Quiz
                  </Link>
                  <Link to={`/edit-course/${course.id}`} 
                    className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    Edit
                  </Link>
                  <button onClick={() => deleteCourse(course.id)} 
                    className="px-3 py-1 rounded-lg text-sm border border-red-500/50 text-red-400 hover:bg-red-500/10 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}