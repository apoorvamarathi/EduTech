


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
    const savedCompany = localStorage.getItem('company');
    if (savedCompany) setCompany(JSON.parse(savedCompany));
    
    const savedJobs = localStorage.getItem('recruiterJobs');
    const userJobs = savedJobs ? JSON.parse(savedJobs) : [];
    setJobs(userJobs);
    
    const active = userJobs.filter(j => j.status === 'Active').length;
    setStats({
      totalJobs: userJobs.length,
      activeJobs: active,
      totalApplications: Math.floor(Math.random() * 50) + 5,
      shortlisted: Math.floor(Math.random() * 15) + 1,
    });
    setLoading(false);
  }, []);

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading dashboard...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
            {company ? (
              <p className="mt-1 text-indigo-300">Managing jobs for <strong className="text-white">{company.name}</strong></p>
            ) : (
              <Link to="/company-register" className="inline-block mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition underline">
                + Register your company first
              </Link>
            )}
          </div>
          <div className="absolute top-0 right-0 opacity-10 text-8xl">🏢</div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Total Jobs</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.totalJobs}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Active Jobs</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.activeJobs}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Total Applications</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.totalApplications}</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-sm text-indigo-300">Shortlisted</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{stats.shortlisted}</p>
          </motion.div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 flex-wrap">
          <Link 
            to="/post-job" 
            className="px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            + Post New Job
          </Link>
          {!company && (
            <Link 
              to="/company-register" 
              className="px-5 py-2 rounded-lg border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
            >
              Register Company
            </Link>
          )}
        </div>

        {/* Posted Jobs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Posted Jobs</h2>
          {jobs.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <p className="text-gray-400">No jobs posted yet.</p>
              <Link to="/post-job" className="inline-block mt-3 text-sm text-indigo-400 hover:text-indigo-300 transition underline">
                Post your first job →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map(job => (
                <div key={job.id} className="flex justify-between items-center p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                    <p className="text-sm text-indigo-300">{job.location} · {job.salary}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills?.map(skill => (
                        <span key={skill} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">#{skill}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {job.status}
                    </span>
                    <Link to={`/applications/${job.id}`} className="block text-sm mt-2 text-indigo-400 hover:text-indigo-300 transition underline">
                      View Applications →
                    </Link>
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