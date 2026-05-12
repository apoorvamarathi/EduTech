



// frontend/src/pages/CourseSearch.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CourseSearch() {
  const [allCourses, setAllCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    const approved = stored.filter(c => c.status === 'approved');
    setAllCourses(approved);
    setFiltered(approved);
  }, []);

  useEffect(() => {
    let results = allCourses;
    if (searchTerm) {
      results = results.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (c.tags && c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))));
    }
    if (category) {
      results = results.filter(c => c.category === category);
    }
    if (priceFilter === 'free') {
      results = results.filter(c => c.isFree);
    } else if (priceFilter === 'paid') {
      results = results.filter(c => !c.isFree);
    }
    setFiltered(results);
  }, [searchTerm, category, priceFilter, allCourses]);

  const categories = [...new Set(allCourses.map(c => c.category))];
  
  const getCourseImage = (title) => {
    return `https://source.unsplash.com/featured/400x200?${encodeURIComponent(title.split(' ')[0])},course`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Explore Courses</h1>
          <p className="text-indigo-300 mt-1">Find the perfect course for your career</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center bg-[#1E293B]/50 p-4 rounded-xl border border-indigo-500/20">
          <input 
            type="text" 
            placeholder="🔍 Search by title or tag..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="flex-1 p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            className="p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select 
            value={priceFilter} 
            onChange={e => setPriceFilter(e.target.value)} 
            className="p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <div key={course.id} className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail || getCourseImage(course.title)} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://source.unsplash.com/featured/400x200?learning'; }}
                />
                {course.isFree && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-green-500 text-white">FREE</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">{course.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {course.tags?.slice(0,3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">#{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold text-indigo-400">{course.isFree ? 'FREE' : `₹${course.price}`}</span>
                  <Link 
                    to={`/course/${course.id}`} 
                    className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}