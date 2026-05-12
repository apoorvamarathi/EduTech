


// frontend/src/pages/CompanyRegistration.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', website: '', industry: '', size: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('company', JSON.stringify(form));
      alert('Company registered successfully! You can now post jobs.');
      navigate('/post-job');
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Register Your Company</h1>
          <p className="text-indigo-300 mt-1">Join as an employer and find top talent</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-4 bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <input 
            type="text" 
            placeholder="Company Name" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            className="w-full p-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" 
            required 
          />
          <input 
            type="url" 
            placeholder="Website URL" 
            value={form.website} 
            onChange={e => setForm({...form, website: e.target.value})} 
            className="w-full p-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" 
          />
          <input 
            type="text" 
            placeholder="Industry (e.g., IT, Finance, Healthcare)" 
            value={form.industry} 
            onChange={e => setForm({...form, industry: e.target.value})} 
            className="w-full p-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" 
          />
          <select 
            value={form.size} 
            onChange={e => setForm({...form, size: e.target.value})} 
            className="w-full p-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="" className="bg-[#0F172A]">Company Size</option>
            <option value="1-10" className="bg-[#0F172A]">1-10 employees</option>
            <option value="11-50" className="bg-[#0F172A]">11-50 employees</option>
            <option value="51-200" className="bg-[#0F172A]">51-200 employees</option>
            <option value="201+" className="bg-[#0F172A]">201+ employees</option>
          </select>
          <textarea 
            placeholder="Company Description" 
            rows="4" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            className="w-full p-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          ></textarea>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Company'}
          </button>
        </form>
      </div>
    </Layout>
  );
}