// frontend/src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function StudentProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', skills: [], resume: null });
  const [skillInput, setSkillInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock fetch from API
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setProfile({
      name: userInfo.name || 'Student Name',
      email: userInfo.email || 'student@example.com',
      skills: ['React', 'JavaScript', 'Node.js'],
      resume: null,
    });
  }, []);

  const addSkill = () => {
    if (skillInput && !profile.skills.includes(skillInput)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, skillInput] }));
      setSkillInput('');
    }
  };
  const removeSkill = (skill) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setProfile(prev => ({ ...prev, resume: file }));
      setMessage('Resume selected: ' + file.name);
    } else {
      alert('Please upload a PDF file.');
    }
  };
  const saveProfile = async () => {
    setUploading(true);
    // Mock save – replace with API call
    setTimeout(() => {
      localStorage.setItem('studentProfile', JSON.stringify({ skills: profile.skills, resumeName: profile.resume?.name }));
      setMessage('Profile saved! Skills and resume will be used for job matching.');
      setUploading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Student Profile</h1>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" value={profile.email} disabled className="w-full p-2 rounded-lg border opacity-70" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
            </div>
            <div>
              <label className="block font-medium mb-1">Skills (for job matching)</label>
              <div className="flex gap-2">
                <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="e.g., Python, React, MongoDB" className="flex-1 p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
                <button onClick={addSkill} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 rounded-full text-sm flex items-center gap-1" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                    {skill} <button onClick={() => removeSkill(skill)} className="ml-1">✕</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Resume (PDF)</label>
              <input type="file" accept=".pdf" onChange={handleResumeUpload} className="mb-1" />
              {profile.resume && <p className="text-sm text-green-600">Selected: {profile.resume.name}</p>}
            </div>
            {message && <p className="text-sm" style={{ color: 'var(--accent)' }}>{message}</p>}
            <button onClick={saveProfile} disabled={uploading} className="w-full py-2 rounded-lg font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>{uploading ? 'Saving...' : 'Save Profile'}</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}