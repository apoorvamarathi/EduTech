// frontend/src/pages/CourseSearch.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CourseSearch() {
  const [allCourses, setAllCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // all, free, paid

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    const approved = stored.filter(c => c.status === 'approved');
    setAllCourses(approved);
    setFiltered(approved);
  }, []);

  useEffect(() => {
    let results = allCourses;
    if (searchTerm) {
      results = results.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
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

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Explore Courses</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <input type="text" placeholder="Search by title or tag..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1 p-2 rounded-lg border" style={{ background: 'var(--bg)' }} />
          <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 rounded-lg border">
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)} className="p-2 rounded-lg border">
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <div key={course.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <img src={course.thumbnail || 'https://via.placeholder.com/300x150'} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm truncate">{course.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {course.tags.slice(0,3).map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{tag}</span>)}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold">{course.isFree ? 'Free' : `₹${course.price}`}</span>
                  <Link to={`/course/${course.id}`} className="px-3 py-1 rounded text-sm" style={{ background: 'var(--accent)', color: 'white' }}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-10">No courses found.</div>}
      </div>
    </Layout>
  );
}