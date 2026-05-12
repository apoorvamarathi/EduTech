


// frontend/src/pages/ManageApplications.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function ManageApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await api.get('/jobs/applications');
        const filtered = jobId ? data.filter(app => app.job?._id === jobId) : data;
        setApplications(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [jobId]);

  const updateStatus = async (appId, newStatus, extra = {}) => {
    try {
      const { data } = await api.put(`/jobs/applications/${appId}`, { status: newStatus, ...extra });
      setApplications(prev => prev.map(app => app._id === appId ? { ...app, ...data } : app));
      alert(`Application updated to ${newStatus}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const scheduleInterview = (appId) => {
    const dateStr = prompt('Enter interview date (YYYY-MM-DDTHH:MM) e.g. 2025-05-01T10:00');
    const link = prompt('Enter interview link (optional)');
    if (dateStr) {
      updateStatus(appId, 'Shortlisted', { interviewDate: new Date(dateStr), interviewLink: link });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'text-yellow-400 bg-yellow-500/10',
      'Shortlisted': 'text-blue-400 bg-blue-500/10',
      'Interviewed': 'text-purple-400 bg-purple-500/10',
      'Selected': 'text-green-400 bg-green-500/10',
      'Hired': 'text-green-400 bg-green-500/10',
      'Rejected': 'text-red-400 bg-red-500/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-500/10';
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading applications...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Applications</h1>
          <p className="text-indigo-300 mt-1">{jobId ? `Applications for Job #${jobId}` : 'All applications for your jobs'}</p>
        </div>
        
        <div className="grid gap-4">
          {applications.length === 0 && (
            <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <p className="text-gray-400">No applications found.</p>
            </div>
          )}
          
          {applications.map(app => (
            <div key={app._id} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{app.student?.name}</h3>
                  <p className="text-indigo-300 text-sm mt-1">📧 {app.student?.email}</p>
                  <p className="text-sm text-gray-400 mt-1">💼 {app.job?.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                  {app.resumeUrl && (
                    <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 transition mt-2 inline-block">
                      📄 View Resume →
                    </a>
                  )}
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  
                  {app.status === 'Applied' && (
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => updateStatus(app._id, 'Shortlisted')} 
                        className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Shortlist
                      </button>
                      <button 
                        onClick={() => updateStatus(app._id, 'Rejected')} 
                        className="px-3 py-1 rounded-lg text-sm border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {app.status === 'Shortlisted' && (
                    <button 
                      onClick={() => scheduleInterview(app._id)} 
                      className="mt-3 px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Schedule Interview
                    </button>
                  )}
                  
                  {app.interviewDate && (
                    <p className="text-xs text-gray-400 mt-2">📅 {new Date(app.interviewDate).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
