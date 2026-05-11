// frontend/src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function LandingPage() {
  const features = [
    { icon: '🎓', title: '10,000+ Courses', desc: 'Learn from industry experts' },
    { icon: '📜', title: 'Certification', desc: 'Earn verified certificates' },
    { icon: '💼', title: 'Placement Support', desc: 'Get hired by top companies' },
    { icon: '🤖', title: 'AI Recommendations', desc: 'Personalized learning path' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="text-center py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          Master Skills <br />
          <span className="text-indigo-400">That Matter</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="text-xl mb-8 text-gray-300"
        >
          Join 2 million+ learners and start your career transformation today.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/signup" 
            className="px-8 py-3 rounded-xl font-semibold transition hover:scale-105 inline-block bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Edutech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }} 
              className="p-6 rounded-2xl text-center transition bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 shadow-lg"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <div className="rounded-3xl p-12 bg-indigo-500/10 border border-indigo-500/30">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to start learning?</h2>
          <Link 
            to="/signup" 
            className="px-8 py-3 rounded-xl font-semibold inline-block bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}