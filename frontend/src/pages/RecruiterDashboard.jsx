// frontend/src/pages/RecruiterDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function RecruiterDashboard() {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, totalApplications: 0, shortlisted: 0 });

  useEffect(() => {
    // Load company data from localStorage (set during registration)
    const savedCompany = localStorage.getItem('company');
    if (savedCompany) setCompany(JSON.parse(savedCompany));
    
    // Load recruiter's jobs
    const savedJobs = localStorage.getItem('recruiterJobs');
    const userJobs = savedJobs ? JSON.parse(savedJobs) : [];
    setJobs(userJobs);
    
    // Compute stats
    const active = userJobs.filter(j => j.status === 'Active').length;
    // Mock applications count – in real app, fetch from API
    setStats({
      totalJobs: userJobs.length,
      activeJobs: active,
      totalApplications: Math.floor(Math.random() * 50) + 5,
      shortlisted: Math.floor(Math.random() * 15) + 1,
    });
    setLoading(false);
  }, []);

  if (loading) return <Layout><div className="text-center py-20">Loading dashboard...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Recruiter Dashboard</h1>
            {company ? (
              <p className="mt-1" style={{ color: 'var(--text)' }}>Managing jobs for <strong>{company.name}</strong></p>
            ) : (
              <Link to="/company-register" className="inline-block mt-2 text-sm underline" style={{ color: 'var(--accent)' }}>+ Register your company first</Link>
            )}
          </div>
          <div className="absolute top-0 right-0 opacity-10 text-7xl">🏢</div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Jobs</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.totalJobs}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Active Jobs</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.activeJobs}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Total Applications</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-h)' }}>{stats.totalApplications}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Shortlisted</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{stats.shortlisted}</p>
          </motion.div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap">
          <Link to="/post-job" className="px-5 py-2 rounded-lg font-medium transition hover:scale-105" style={{ background: 'var(--accent)', color: 'white' }}>+ Post New Job</Link>
          {!company && <Link to="/company-register" className="px-5 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>Register Company</Link>}
        </div>

        {/* Posted Jobs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-h)' }}>Your Posted Jobs</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text)' }}>No jobs posted yet.</p>
              <Link to="/post-job" className="inline-block mt-3 text-sm underline" style={{ color: 'var(--accent)' }}>Post your first job</Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map(job => (
                <div key={job.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-h)' }}>{job.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{job.location} · {job.salary}</p>
                    <div className="flex gap-2 mt-1">
                      {job.skills.map(skill => <span key={skill} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{skill}</span>)}
                    </div>
                    <p className="text-xs mt-1">Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: job.status === 'Active' ? 'var(--accent-bg)' : 'var(--code-bg)', color: job.status === 'Active' ? 'var(--accent)' : 'var(--text)' }}>{job.status}</span>
                    <Link to={`/applications/${job.id}`} className="block text-sm mt-2 underline" style={{ color: 'var(--accent)' }}>View Applications →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}