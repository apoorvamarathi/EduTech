




// frontend/src/pages/JobsList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [showApply, setShowApply] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isStudent = userInfo.role === 'student';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    if (!isStudent) {
      alert('Only students can apply for jobs.');
      return;
    }
    setShowApply(jobId);
  };

  const submitApplication = async () => {
    setApplying(true);
    try {
      await api.post('/jobs/apply', {
        jobId: showApply,
        resumeUrl: 'https://example.com/resume.pdf'
      });
      alert('Application submitted! The recruiter will review your profile.');
      setShowApply(null);
      setCoverLetter('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading jobs...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Job Opportunities</h1>
            <p className="text-indigo-300 mt-1">Find your dream job</p>
          </div>
          {isStudent && (
            <Link to="/student-profile" className="text-sm text-indigo-400 hover:text-indigo-300 transition underline">
              Update Profile for Matching →
            </Link>
          )}
        </div>
        
        <div className="grid gap-4">
          {jobs.length === 0 && (
            <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <p className="text-gray-400">No open jobs available.</p>
            </div>
          )}
          
          {jobs.map(job => (
            <div key={job._id} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-indigo-300 text-sm mt-1">🏢 {job.recruiter?.name} · {job.recruiter?.company || 'Remote'}</p>
                  <p className="text-xs text-gray-400 mt-1">📅 Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skillsRequired && job.skillsRequired.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">#{skill}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => handleApply(job._id)} 
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {showApply && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
            <div className="p-6 rounded-xl max-w-lg w-full bg-[#1E293B] border border-indigo-500/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Submit Application</h2>
              <label className="block text-sm text-indigo-300 mb-1">Cover Letter</label>
              <textarea 
                placeholder="Why are you a good fit?" 
                rows="4" 
                value={coverLetter} 
                onChange={e => setCoverLetter(e.target.value)} 
                className="w-full p-3 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              ></textarea>
              <p className="text-xs mt-2 text-gray-400">📄 Your resume from profile will be attached automatically.</p>
              <div className="flex gap-3 mt-5">
                <button 
                  onClick={submitApplication} 
                  disabled={applying} 
                  className="flex-1 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button 
                  onClick={() => setShowApply(null)} 
                  className="flex-1 py-2 rounded-lg font-medium border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}