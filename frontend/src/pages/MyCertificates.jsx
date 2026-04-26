// // frontend/src/pages/MyCertificates.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function MyCertificates() {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load certificates from localStorage (saved after passing quizzes)
//     const stored = localStorage.getItem('myCertificates');
//     if (stored) {
//       setCertificates(JSON.parse(stored));
//     } else {
//       // Optional: demo certificate for testing
//       // setCertificates([...]);
//     }
//     setLoading(false);
//   }, []);

//   if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>My Certificates</h1>
//         {certificates.length === 0 ? (
//           <div className="text-center py-10 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//             <p style={{ color: 'var(--text)' }}>No certificates yet. Complete a course quiz with a passing score to earn one.</p>
//             <Link to="/courses" className="inline-block mt-3 px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Browse Courses</Link>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {certificates.map(cert => (
//               <div key={cert.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//                 <div>
//                   <h3 className="font-semibold text-lg" style={{ color: 'var(--text-h)' }}>{cert.courseTitle}</h3>
//                   <p className="text-sm" style={{ color: 'var(--text)' }}>Issued: {cert.issueDate} · Credential ID: {cert.credentialId}</p>
//                 </div>
//                 <Link to={`/certificate/${cert.id}`} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>
//                   View
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// frontend/src/pages/MyCertificates.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

// SVG Icons
const CertificateIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4zM9 9h6M9 13h6M9 17h4" />
    <path d="M8 2v4M16 2v4" />
  </svg>
);

const RibbonIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 15l-4 4-2-2M12 15l4 4 2-2M12 15V3" />
    <circle cx="12" cy="18" r="3" />
  </svg>
);

export default function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('myCertificates');
    if (stored) {
      setCertificates(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
          <div className="relative z-10 flex items-center gap-3">
            <CertificateIcon />
            <div>
              <h1 className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>My Certificates</h1>
              <p className="mt-1" style={{ color: 'var(--text)' }}>Verified achievements – shareable & verifiable</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <RibbonIcon />
          </div>
        </div>

        {certificates.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 rounded-2xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
              <CertificateIcon />
            </div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-h)' }}>No certificates yet</h2>
            <p className="mt-2" style={{ color: 'var(--text)' }}>Complete a course quiz with a passing score to earn your first certificate.</p>
            <Link to="/courses" className="inline-block mt-6 px-6 py-2 rounded-xl font-medium transition hover:scale-105" style={{ background: 'var(--accent)', color: 'white' }}>Explore Courses</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
              >
                <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, var(--accent), #ff8c00)' }}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="text-[var(--accent)]">
                      <RibbonIcon />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>Verified</span>
                  </div>
                  <h3 className="text-xl font-bold mt-3" style={{ color: 'var(--text-h)' }}>{cert.courseTitle}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>ID: {cert.credentialId}</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--text)' }}>Issued: {cert.issueDate}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1 text-sm">
                      <span>⭐ {cert.score}</span>
                      <span className="text-xs">Grade {cert.grade}</span>
                    </div>
                    <Link
                      to={`/certificate/${cert.id}`}
                      className="px-4 py-1.5 rounded-lg text-sm font-medium transition group-hover:shadow-lg"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      View Certificate →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}