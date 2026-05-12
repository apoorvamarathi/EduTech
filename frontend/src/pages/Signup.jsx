    
// frontend/src/pages/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Signup() {
  const [step, setStep] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setStep('verify');
      alert('Verification OTP sent to your email');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/verify-email', {
        email: formData.email,
        otp,
      });
      alert('Email verified! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-[#1E293B]/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left side – Brand / Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Edutech</h2>
              <p className="mt-2 text-indigo-300">Start your learning journey today</p>
            </div>
            <div className="my-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
                  <span className="text-gray-200">Access 10,000+ courses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
                  <span className="text-gray-200">Learn from industry experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
                  <span className="text-gray-200">Get certified & placed</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-indigo-300">Join 2 million+ learners worldwide</div>
          </div>

          {/* Right side – Signup form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Create account</h1>
              <p className="text-sm text-indigo-300 mt-1">
                {step === 'register' ? 'Start your learning adventure' : 'Enter the verification code'}
              </p>
            </div>

            {step === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-1 text-sm text-indigo-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
                  >
                    Full name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1 text-sm text-indigo-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-1 text-sm text-indigo-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                {/* Role selection - WITH ADMIN OPTION */}
                <div className="space-y-2">
                  <label className="text-sm text-indigo-300 font-medium">I want to join as:</label>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-indigo-300 transition">
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === 'student'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>🎓 Student</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-indigo-300 transition">
                      <input
                        type="radio"
                        name="role"
                        value="instructor"
                        checked={formData.role === 'instructor'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>👨‍🏫 Instructor</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-indigo-300 transition">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={formData.role === 'recruiter'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>🏢 Recruiter</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-indigo-300 transition">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>⚙️ Admin</span>
                    </label>
                  </div>
                </div>

                {/* Optional: Add a note about admin role */}
                <p className="text-xs text-indigo-400/70 mt-1">
                  ⚡ Note: Admin accounts have full platform access
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-70 shadow-lg shadow-indigo-500/20"
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </motion.button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-center text-2xl tracking-widest"
                    placeholder=" "
                    maxLength="6"
                    required
                  />
                  <label
                    htmlFor="otp"
                    className="absolute left-4 top-1 text-sm text-indigo-300 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
                  >
                    Enter 6-digit OTP
                  </label>
                </div>
                <p className="text-xs text-center text-indigo-300">Sent to {formData.email}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-70 shadow-lg shadow-indigo-500/20"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </motion.button>
                <button
                  onClick={() => setStep('register')}
                  className="w-full text-sm underline text-indigo-400 hover:text-indigo-300 transition"
                >
                  Back to signup
                </button>
              </div>
            )}

            {/* Divider & Social signup (only on register step) */}
            {step === 'register' && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-indigo-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#1E293B] text-indigo-300">or</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-gray-300 text-sm hover:bg-indigo-500/10 hover:border-indigo-500/50 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-500/30 bg-[#0F172A] text-gray-300 text-sm hover:bg-indigo-500/10 hover:border-indigo-500/50 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" fill="#FFFFFF"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-sm text-gray-400 mt-8">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}