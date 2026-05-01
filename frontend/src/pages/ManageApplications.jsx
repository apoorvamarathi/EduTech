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
        // If jobId is provided in URL, filter, else show all
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

  if (loading) return <Layout><div className="text-center py-20">Loading applications...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Applications {jobId ? `for Job #${jobId}` : 'for all your jobs'}</h1>
        <div className="space-y-4">
          {applications.length === 0 && <p>No applications found.</p>}
          {applications.map(app => (
            <div key={app._id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-start flex-wrap">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{app.student?.name} <span className="text-sm font-normal text-gray-500">for {app.job?.title}</span></h3>
                  <p className="text-sm">Email: {app.student?.email}</p>
                  <p className="text-xs">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                  {app.resumeUrl && <a href={app.resumeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>View Resume</a>}
                </div>
                <div className="text-right">
                  {app.status === 'Applied' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(app._id, 'Shortlisted')} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Shortlist</button>
                      <button onClick={() => updateStatus(app._id, 'Rejected')} className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Reject</button>
                    </div>
                  )}
                  {app.status === 'Shortlisted' && (
                    <div>
                      <span className="text-sm text-yellow-600 font-semibold block mb-2">Shortlisted</span>
                      <button onClick={() => scheduleInterview(app._id)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Schedule Interview</button>
                    </div>
                  )}
                  {(app.status === 'Interviewed' || app.status === 'Selected' || app.status === 'Hired') && <span className="text-sm text-green-600 font-semibold">{app.status}</span>}
                  {app.status === 'Rejected' && <span className="text-sm text-red-500 font-semibold">Rejected</span>}
                  
                  {app.interviewDate && (
                    <p className="text-xs mt-2">Interview: {new Date(app.interviewDate).toLocaleString()}</p>
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