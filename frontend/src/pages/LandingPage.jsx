

// frontend/src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function LandingPage() {
  const features = [
    { icon: '🎓', title: '10,000+ Courses', desc: 'Learn from industry experts', color: 'from-blue-500 to-cyan-500' },
    { icon: '📜', title: 'Certification', desc: 'Earn verified certificates', color: 'from-purple-500 to-pink-500' },
    { icon: '💼', title: 'Placement Support', desc: 'Get hired by top companies', color: 'from-green-500 to-emerald-500' },
    { icon: '🤖', title: 'AI Recommendations', desc: 'Personalized learning path', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-white">Master Skills </span>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">That Matter</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
        >
          Join 2 million+ learners and start your career transformation today.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Link 
            to="/signup" 
            className="px-8 py-3 rounded-xl font-semibold transition hover:scale-105 inline-block bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
          >
            Get Started Free →
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl bg-[#1E293B]/50 border border-indigo-500/20">
            <div className="text-3xl font-bold text-indigo-400">2M+</div>
            <div className="text-sm text-gray-400">Learners</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#1E293B]/50 border border-indigo-500/20">
            <div className="text-3xl font-bold text-indigo-400">10k+</div>
            <div className="text-sm text-gray-400">Courses</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#1E293B]/50 border border-indigo-500/20">
            <div className="text-3xl font-bold text-indigo-400">500+</div>
            <div className="text-sm text-gray-400">Instructors</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-[#1E293B]/50 border border-indigo-500/20">
            <div className="text-3xl font-bold text-indigo-400">95%</div>
            <div className="text-sm text-gray-400">Placement Rate</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Edutech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }} 
              className="p-6 rounded-2xl text-center transition-all duration-300 bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <div className="rounded-2xl p-12 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to start learning?</h2>
          <p className="text-indigo-300 mb-6">Join thousands of students already learning on Edutech</p>
          <Link 
            to="/signup" 
            className="px-8 py-3 rounded-xl font-semibold inline-block bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            Sign Up Now →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
