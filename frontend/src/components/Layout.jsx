// frontend/src/components/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isLoggedIn = !!userInfo.token;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/5 animate-gradient" />
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>Edutech</Link>
            <div className="flex items-center gap-6">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Dashboard</Link>
                  <Link to="/courses" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Courses</Link>
                  <Link to="/jobs" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Jobs</Link>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium transition" style={{ background: 'var(--accent)', color: 'white' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Login</Link>
                  <Link to="/signup" className="px-4 py-2 rounded-lg text-sm font-medium transition" style={{ background: 'var(--accent)', color: 'white' }}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto py-6 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
        <p>© 2026 Edutech. All rights reserved.</p>
      </footer>
    </div>
  );
}