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
        description: form.description + `\nLocation: ${form.location}\nSalary: ${form.salary}`,
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