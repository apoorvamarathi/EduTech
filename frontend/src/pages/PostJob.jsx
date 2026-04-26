// frontend/src/pages/PostJob.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', location: '', salary: '', skills: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock save – add to localStorage jobs list
    const existing = localStorage.getItem('recruiterJobs');
    const jobs = existing ? JSON.parse(existing) : [];
    const newJob = { id: Date.now(), ...form, skills: form.skills.split(',').map(s => s.trim()), postedAt: new Date().toISOString(), status: 'Active' };
    jobs.push(newJob);
    localStorage.setItem('recruiterJobs', JSON.stringify(jobs));
    setTimeout(() => {
      alert('Job posted successfully!');
      navigate('/recruiter/dashboard');
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Post a New Job</h1>
        <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <input type="text" placeholder="Job Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-2 rounded-lg border" required />
          <input type="text" placeholder="Location (Remote, City, etc.)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-2 rounded-lg border" required />
          <input type="text" placeholder="Salary (e.g., ₹8L - ₹12L)" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} className="w-full p-2 rounded-lg border" required />
          <input type="text" placeholder="Skills required (comma separated, e.g., React, Node.js)" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} className="w-full p-2 rounded-lg border" required />
          <textarea placeholder="Job Description" rows="5" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 rounded-lg border" required />
          <button type="submit" disabled={loading} className="w-full py-2 rounded-lg font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>{loading ? 'Posting...' : 'Post Job'}</button>
        </form>
      </div>
    </Layout>
  );
}