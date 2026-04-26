// frontend/src/pages/JobsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [showApply, setShowApply] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isStudent = userInfo.role === 'student';

  useEffect(() => {
    // Mock jobs – in real app fetch from API
    const mockJobs = [
      { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '₹8L - ₹12L', skills: ['React', 'Tailwind'], postedAt: '2025-04-20' },
      { id: 2, title: 'Backend Engineer', company: 'DataSys', location: 'Bangalore', salary: '₹10L - ₹15L', skills: ['Node.js', 'MongoDB'], postedAt: '2025-04-18' },
    ];
    setJobs(mockJobs);
  }, []);

  const handleApply = (jobId) => {
    if (!isStudent) {
      alert('Only students can apply for jobs.');
      return;
    }
    setShowApply(jobId);
  };

  const submitApplication = () => {
    setApplying(true);
    // Mock API call
    setTimeout(() => {
      alert('Application submitted! The recruiter will review your profile.');
      setShowApply(null);
      setCoverLetter('');
      setApplying(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Job Opportunities</h1>
          {isStudent && <Link to="/student-profile" className="text-sm underline" style={{ color: 'var(--accent)' }}>Update Profile for Matching</Link>}
        </div>
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-start flex-wrap">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-h)' }}>{job.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>{job.company} · {job.location} · {job.salary}</p>
                  <p className="text-xs mt-1">Posted: {job.postedAt}</p>
                  <div className="flex gap-2 mt-2">
                    {job.skills.map(skill => <span key={skill} className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{skill}</span>)}
                  </div>
                </div>
                <button onClick={() => handleApply(job.id)} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Apply</button>
              </div>
            </div>
          ))}
        </div>
        {showApply && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="p-6 rounded-xl max-w-lg w-full" style={{ background: 'var(--bg)' }}>
              <h2 className="text-xl font-bold mb-4">Submit Application</h2>
              <label className="block text-sm mb-1">Cover Letter</label>
              <textarea placeholder="Why are you a good fit?" rows="4" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="w-full p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}></textarea>
              <p className="text-xs mt-2" style={{ color: 'var(--text)' }}>Your resume from profile will be attached automatically.</p>
              <div className="flex gap-3 mt-4">
                <button onClick={submitApplication} disabled={applying} className="flex-1 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>{applying ? 'Submitting...' : 'Submit'}</button>
                <button onClick={() => setShowApply(null)} className="flex-1 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}