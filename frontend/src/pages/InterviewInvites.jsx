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
        // Filter applications that have been shortlisted or interviewed
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

  // For this mock-like UI action, we just update the local state, but in a real app
  // we would send an update to an interview confirmation endpoint.
  const respondToInvite = (inviteId, accept) => {
    setInvites(prev => prev.map(inv => inv._id === inviteId ? { ...inv, status: accept ? 'Interviewed' : 'Rejected' } : inv));
    alert(accept ? 'Interview accepted. Details sent to email.' : 'Interview declined.');
  };

  if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Interview Invitations</h1>
        {invites.length === 0 && <p>No invitations yet.</p>}
        {invites.map(invite => (
          <div key={invite._id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h3 className="font-semibold">{invite.job?.title} at {invite.job?.recruiter?.name || 'Company'}</h3>
            <p className="text-sm">Scheduled: {invite.interviewDate ? new Date(invite.interviewDate).toLocaleString() : 'TBD'}</p>
            {invite.status === 'Shortlisted' ? (
              <div className="flex gap-3 mt-2">
                <button onClick={() => respondToInvite(invite._id, true)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Accept</button>
                <button onClick={() => respondToInvite(invite._id, false)} className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Decline</button>
              </div>
            ) : (
              <span className="text-sm" style={{ color: invite.status === 'Interviewed' || invite.status === 'Selected' ? 'green' : 'red' }}>{invite.status.toUpperCase()}</span>
            )}
            {invite.interviewLink && <p className="text-xs mt-2"><a href={invite.interviewLink} target="_blank" rel="noreferrer" style={{color: 'var(--accent)'}}>Join Interview</a></p>}
          </div>
        ))}
      </div>
    </Layout>
  );
}