// frontend/src/pages/RecruiterDashboard.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, title: 'Frontend Developer', applicants: 12, status: 'Active' },
        { id: 2, title: 'Backend Engineer', applicants: 8, status: 'Active' },
      ]);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Recruiter Dashboard</h1>
          <button className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Post New Job</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-h)' }}>{job.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text)' }}>Applicants: {job.applicants}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{job.status}</span>
                <button style={{ color: 'var(--accent)' }}>View Applicants →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}