// // frontend/src/pages/CompanyRegistration.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function CompanyRegistration() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', website: '', industry: '', size: '', description: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Mock API call
//     setTimeout(() => {
//       localStorage.setItem('company', JSON.stringify(form));
//       alert('Company registered successfully! You can now post jobs.');
//       navigate('/post-job');
//     }, 1000);
//   };

//   return (
//     <Layout>
//       <div className="max-w-2xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Register Your Company</h1>
//         <form onSubmit={handleSubmit} className="p-6 rounded-xl space-y-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//           <input type="text" placeholder="Company Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} required />
//           <input type="url" placeholder="Website URL" value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full p-2 rounded-lg border" />
//           <input type="text" placeholder="Industry (e.g., IT, Finance, Healthcare)" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className="w-full p-2 rounded-lg border" />
//           <select value={form.size} onChange={e => setForm({...form, size: e.target.value})} className="w-full p-2 rounded-lg border">
//             <option value="">Company Size</option>
//             <option value="1-10">1-10 employees</option>
//             <option value="11-50">11-50 employees</option>
//             <option value="51-200">51-200 employees</option>
//             <option value="201+">201+ employees</option>
//           </select>
//           <textarea placeholder="Company Description" rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 rounded-lg border"></textarea>
//           <button type="submit" disabled={loading} className="w-full py-2 rounded-lg font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>{loading ? 'Registering...' : 'Register Company'}</button>
//         </form>
//       </div>
//     </Layout>
//   );
// }


// frontend/src/pages/CompanyRegistration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CompanyRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', website: '', industry: '', size: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('company', JSON.stringify(form));
      alert('Company registered successfully! You can now post jobs.');
      navigate('/post-job');
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Register Your Company</h1>
        <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 space-y-4">
          <input type="text" placeholder="Company Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-indigo-300/50 focus:outline-none focus:border-indigo-400" required />
          <input type="url" placeholder="Website URL" value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-indigo-300/50" />
          <input type="text" placeholder="Industry (e.g., IT, Finance, Healthcare)" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-indigo-300/50" />
          <select value={form.size} onChange={e => setForm({...form, size: e.target.value})} className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white">
            <option value="">Company Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201+">201+ employees</option>
          </select>
          <textarea placeholder="Company Description" rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder:text-indigo-300/50"></textarea>
          <button type="submit" disabled={loading} className="w-full py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50">
            {loading ? 'Registering...' : 'Register Company'}
          </button>
        </form>
      </div>
    </Layout>
  );
}


