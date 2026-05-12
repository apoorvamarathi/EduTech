


// frontend/src/pages/InterviewInvites.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function InterviewInvites() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const { data } = await api.get('/jobs/applications/my');
        const filtered = data.filter(app => ['Shortlisted', 'Interviewed', 'Selected', 'Rejected'].includes(app.status));
        setInvites(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvites();
  }, []);

  const respondToInvite = (inviteId, accept) => {
    setInvites(prev => prev.map(inv => inv._id === inviteId ? { ...inv, status: accept ? 'Interviewed' : 'Rejected' } : inv));
    alert(accept ? 'Interview accepted. Details sent to email.' : 'Interview declined.');
  };

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Interview Invitations</h1>
          <p className="text-indigo-300 mt-1">Track and manage your interview schedules</p>
        </div>
        
        {invites.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-gray-400">No interview invitations yet.</p>
          </div>
        )}
        
        <div className="grid gap-4">
          {invites.map(invite => (
            <div key={invite._id} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{invite.job?.title}</h3>
                  <p className="text-indigo-300 text-sm mt-1">🏢 {invite.job?.recruiter?.name || 'Company'}</p>
                  <p className="text-sm text-gray-400 mt-2">📅 Scheduled: {invite.interviewDate ? new Date(invite.interviewDate).toLocaleString() : 'TBD'}</p>
                </div>
                <div className="text-right">
                  {invite.status === 'Shortlisted' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => respondToInvite(invite._id, true)} 
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        ✅ Accept
                      </button>
                      <button 
                        onClick={() => respondToInvite(invite._id, false)} 
                        className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
                      >
                        ❌ Decline
                      </button>
                    </div>
                  ) : (
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      invite.status === 'Interviewed' || invite.status === 'Selected' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {invite.status.toUpperCase()}
                    </span>
                  )}
                  {invite.interviewLink && (
                    <p className="text-xs mt-2">
                      <a href={invite.interviewLink} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition">
                        🔗 Join Interview →
                      </a>
                    </p>
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