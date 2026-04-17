// frontend/src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      alert('Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/5 animate-gradient" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md rounded-3xl shadow-2xl backdrop-blur-sm" style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <div className="p-6 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Create new password</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>Enter OTP and your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input type="email" value={email} disabled className="w-full px-4 py-3 rounded-xl border bg-opacity-50" style={{ backgroundColor: 'var(--code-bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            </div>
            <div className="relative">
              <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none focus:ring-1 transition-all" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)', '--tw-ring-color': 'var(--accent)' }} placeholder=" " required />
              <label htmlFor="otp" className="absolute left-4 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" style={{ color: 'var(--text)' }}>6-digit OTP</label>
            </div>
            <div className="relative">
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none focus:ring-1 transition-all" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)', '--tw-ring-color': 'var(--accent)' }} placeholder=" " required />
              <label htmlFor="newPassword" className="absolute left-4 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" style={{ color: 'var(--text)' }}>New password</label>
            </div>
            <div className="relative">
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none focus:ring-1 transition-all" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)', '--tw-ring-color': 'var(--accent)' }} placeholder=" " required />
              <label htmlFor="confirmPassword" className="absolute left-4 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" style={{ color: 'var(--text)' }}>Confirm password</label>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-70" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-8" style={{ color: 'var(--text)' }}>
            <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>Back to Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}