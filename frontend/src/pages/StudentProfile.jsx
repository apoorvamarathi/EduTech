// frontend/src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function StudentProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', skills: [], resume: null });
  const [skillInput, setSkillInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
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
    setTimeout(() => {
      localStorage.setItem('studentProfile', JSON.stringify({ skills: profile.skills, resumeName: profile.resume?.name }));
      setMessage('Profile saved! Skills and resume will be used for job matching.');
      setUploading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Student Profile</h1>
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-200">Full Name</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})} 
                className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-400" 
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-200">Email</label>
              <input 
                type="email" 
                value={profile.email} 
                disabled 
                className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-gray-300 opacity-80" 
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-200">Skills (for job matching)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={skillInput} 
                  onChange={e => setSkillInput(e.target.value)} 
                  placeholder="e.g., Python, React, MongoDB" 
                  className="flex-1 p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-gray-400 focus:outline-none focus:border-indigo-400" 
                />
                <button onClick={addSkill} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 rounded-full text-sm flex items-center gap-1 bg-indigo-500/20 text-indigo-300">
                    {skill} <button onClick={() => removeSkill(skill)} className="ml-1 text-red-400 hover:text-red-300">✕</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-200">Resume (PDF)</label>
              <input type="file" accept=".pdf" onChange={handleResumeUpload} className="text-gray-300" />
              {profile.resume && <p className="text-sm text-emerald-400 mt-1">Selected: {profile.resume.name}</p>}
            </div>
            {message && <p className="text-sm text-indigo-400">{message}</p>}
            <button 
              onClick={saveProfile} 
              disabled={uploading} 
              className="w-full py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {uploading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}