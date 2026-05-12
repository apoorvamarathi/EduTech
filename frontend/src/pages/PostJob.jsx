


// frontend/src/pages/PostJob.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', location: '', salary: '', skills: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/jobs', {
        title: form.title,
        description: form.description + `\n📍 Location: ${form.location}\n💰 Salary: ${form.salary}`,
        skillsRequired: form.skills.split(',').map(s => s.trim())
      });
      alert('Job posted successfully!');
      navigate('/recruiter/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
          <p className="text-indigo-300 mt-1">Find the best talent for your company</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-4 bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <input 
            type="text" 
            placeholder="Job Title" 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required 
          />
          <input 
            type="text" 
            placeholder="📍 Location (Remote, City, etc.)" 
            value={form.location} 
            onChange={e => setForm({...form, location: e.target.value})} 
            className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required 
          />
          <input 
            type="text" 
            placeholder="💰 Salary (e.g., ₹8L - ₹12L)" 
            value={form.salary} 
            onChange={e => setForm({...form, salary: e.target.value})} 
            className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required 
          />
          <input 
            type="text" 
            placeholder="🔧 Skills required (comma separated, e.g., React, Node.js)" 
            value={form.skills} 
            onChange={e => setForm({...form, skills: e.target.value})} 
            className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required 
          />
          <textarea 
            placeholder="📝 Job Description" 
            rows="5" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            required 
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg shadow-indigo-500/20"
          >
            {loading ? 'Posting...' : '📢 Post Job'}
          </button>
        </form>
      </div>
    </Layout>
  );
}