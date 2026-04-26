// frontend/src/pages/ManageApplications.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ManageApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [scheduling, setScheduling] = useState(null);

  useEffect(() => {
    // Mock data – replace with API fetch
    setApplications([
      { id: 101, studentName: 'Alice Johnson', skills: ['React', 'Node.js'], status: 'pending', appliedAt: '2025-04-20', resumeUrl: '#' },
      { id: 102, studentName: 'Bob Smith', skills: ['React', 'Tailwind'], status: 'pending', appliedAt: '2025-04-19', resumeUrl: '#' },
    ]);
  }, [jobId]);

  const updateStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    alert(`Application ${newStatus === 'shortlisted' ? 'shortlisted' : 'rejected'}`);
  };

  const scheduleInterview = (appId) => {
    const date = prompt('Enter interview date and time (e.g., 2025-05-01 10:00 AM)');
    if (date) {
      alert(`Interview scheduled for ${date}. Notification sent to student.`);
      updateStatus(appId, 'interview_scheduled');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Applications for Job #{jobId}</h1>
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-start flex-wrap">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{app.studentName}</h3>
                  <p className="text-sm">Skills: {app.skills.join(', ')}</p>
                  <p className="text-xs">Applied: {app.appliedAt}</p>
                  <a href={app.resumeUrl} style={{ color: 'var(--accent)' }}>View Resume</a>
                </div>
                <div className="text-right">
                  {app.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(app.id, 'shortlisted')} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Shortlist</button>
                      <button onClick={() => updateStatus(app.id, 'rejected')} className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Reject</button>
                    </div>
                  )}
                  {app.status === 'shortlisted' && (
                    <div>
                      <span className="text-sm text-green-600">Shortlisted</span>
                      <button onClick={() => scheduleInterview(app.id)} className="ml-3 px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Schedule Interview</button>
                    </div>
                  )}
                  {app.status === 'interview_scheduled' && <span className="text-sm text-blue-600">Interview scheduled</span>}
                  {app.status === 'rejected' && <span className="text-sm text-red-500">Rejected</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}