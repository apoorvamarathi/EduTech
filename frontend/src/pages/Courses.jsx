
// frontend/src/pages/Courses.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  // Course category images mapping
  const getCourseImage = (category, title) => {
    const images = {
      'Web Development': 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=200&fit=crop',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      'Mobile Apps': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
      'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop',
    };
    return images[category] || `https://source.unsplash.com/featured/400x200?${encodeURIComponent(title.split(' ')[0])}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">All Courses</h1>
            <p className="text-indigo-300 mt-1">Discover your next learning adventure</p>
          </div>
          <input 
            type="text" 
            placeholder="🔍 Search courses..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="px-4 py-2 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition w-full sm:w-64"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-white">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course._id} className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail || getCourseImage(course.category, course.title)} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { 
                      e.target.src = `https://source.unsplash.com/featured/400x200?code,${encodeURIComponent(course.category || 'coding')}`;
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-sm">
                      {course.category || 'Course'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition line-clamp-1">{course.title}</h3>
                  <p className="text-sm mt-1 text-indigo-300">👨‍🏫 {course.instructor?.name || 'Instructor'}</p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{course.description?.substring(0, 80)}...</p>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-2xl font-bold text-indigo-400">₹{course.price}</span>
                      <span className="text-xs text-gray-400 ml-1">one-time</span>
                    </div>
                    <Link 
                      to={`/course/${course._id}`} 
                      className="px-4 py-2 rounded-lg text-sm font-medium transition bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p>No courses found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}