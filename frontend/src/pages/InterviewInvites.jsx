// frontend/src/pages/InterviewInvites.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function InterviewInvites() {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    // Mock invites
    setInvites([
      { id: 1, jobTitle: 'Frontend Developer', company: 'TechCorp', date: '2025-05-01 10:00 AM', status: 'pending' },
      { id: 2, jobTitle: 'Backend Engineer', company: 'DataSys', date: '2025-05-03 2:00 PM', status: 'pending' },
    ]);
  }, []);

  const respondToInvite = (inviteId, accept) => {
    setInvites(prev => prev.map(inv => inv.id === inviteId ? { ...inv, status: accept ? 'accepted' : 'declined' } : inv));
    alert(accept ? 'Interview accepted. Details sent to email.' : 'Interview declined.');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Interview Invitations</h1>
        {invites.length === 0 && <p>No invitations yet.</p>}
        {invites.map(invite => (
          <div key={invite.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h3 className="font-semibold">{invite.jobTitle} at {invite.company}</h3>
            <p className="text-sm">Scheduled: {invite.date}</p>
            {invite.status === 'pending' ? (
              <div className="flex gap-3 mt-2">
                <button onClick={() => respondToInvite(invite.id, true)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Accept</button>
                <button onClick={() => respondToInvite(invite.id, false)} className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Decline</button>
              </div>
            ) : (
              <span className="text-sm" style={{ color: invite.status === 'accepted' ? 'green' : 'red' }}>{invite.status.toUpperCase()}</span>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}