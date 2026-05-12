
// frontend/src/pages/MyCertificates.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../utils/api';

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

  if (loading) return <Layout><div className="text-center py-20 text-white">Loading certificates...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30">
          <div className="relative z-10 flex items-center gap-3">
            <div className="text-4xl">🏆</div>
            <div>
              <h1 className="text-4xl font-bold text-white">My Certificates</h1>
              <p className="mt-1 text-indigo-300">Verified achievements – shareable & verifiable</p>
            </div>
          </div>
        </div>

        {certificates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center py-16 rounded-2xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20"
          >
            <div className="text-6xl mb-4">📜</div>
            <h2 className="text-2xl font-semibold text-white">No certificates yet</h2>
            <p className="mt-2 text-gray-400">Complete a course quiz with a passing score to earn your first certificate.</p>
            <Link 
              to="/courses" 
              className="inline-block mt-6 px-6 py-2 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Explore Courses →
            </Link>
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
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40"
              >
                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="text-5xl">🏅</div>
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">Verified ✓</span>
                  </div>
                  <h3 className="text-xl font-bold mt-3 text-white">{cert.course?.title || 'Unknown Course'}</h3>
                  <p className="text-sm mt-1 text-gray-400">ID: {cert._id?.slice(-8)}</p>
                  <p className="text-xs mt-2 text-gray-400">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-green-400">⭐ Passed</span>
                    </div>
                    <a
                      href={`http://localhost:5000${cert.pdfUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
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