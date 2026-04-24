// frontend/src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/5 animate-gradient" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl shadow-2xl backdrop-blur-sm"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="p-6 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Reset password</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>
              {!submitted ? 'Enter your email to receive an OTP' : 'Check your email for the OTP'}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none focus:ring-1 transition-all"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)', '--tw-ring-color': 'var(--accent)' }}
                  placeholder=" "
                  required
                />
                <label htmlFor="email" className="absolute left-4 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" style={{ color: 'var(--text)' }}>Email address</label>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-70" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                {loading ? 'Sending...' : 'Send OTP'}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-4" style={{ color: 'var(--text)' }}>We've sent a 6-digit OTP to <strong>{email}</strong></p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/reset-password', { state: { email } })} className="w-full py-3 rounded-xl font-semibold" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                Go to Reset Password
              </motion.button>
            </div>
          )}

          <p className="text-center text-sm mt-8" style={{ color: 'var(--text)' }}>
            Remember password? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
