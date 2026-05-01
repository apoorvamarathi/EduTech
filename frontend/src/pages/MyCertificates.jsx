// frontend/src/pages/MyCertificates.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../utils/api';

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
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get('/certificates/my');
        setCertificates(data);
      } catch (error) {
        console.error('Failed to fetch certificates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return <Layout><div className="text-center py-20">Loading certificates...</div></Layout>;

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
                key={cert._id}
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
                  <h3 className="text-xl font-bold mt-3" style={{ color: 'var(--text-h)' }}>{cert.course?.title || 'Unknown Course'}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>ID: {cert._id}</p>
                  <p className="text-xs mt-2" style={{ color: 'var(--text)' }}>Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1 text-sm">
                      {/* Placeholder since score isn't saved on certificate model yet */}
                      <span>⭐ Passed</span>
                    </div>
                    <a
                      href={`http://localhost:5000${cert.pdfUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-lg text-sm font-medium transition group-hover:shadow-lg"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      View Certificate →
                    </a>
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