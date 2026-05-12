



// frontend/src/components/Layout.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isLoggedIn = !!userInfo.token;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Role‑based dashboard link
  let dashboardLink = '/dashboard';
  if (userInfo.role === 'instructor') dashboardLink = '/instructor/dashboard';
  if (userInfo.role === 'recruiter') dashboardLink = '/recruiter/dashboard';
  if (userInfo.role === 'admin') dashboardLink = '/admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#1E293B]/80 backdrop-blur-sm border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Edutech
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {isLoggedIn ? (
                <>
                  <Link 
                    to={dashboardLink} 
                    className="text-gray-300 hover:text-indigo-400 transition"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to={userInfo.role === 'instructor' ? '/instructor' : '/courses'} 
                    className="text-gray-300 hover:text-indigo-400 transition"
                  >
                    {userInfo.role === 'instructor' ? 'My Courses' : 'Courses'}
                  </Link>
                  <Link 
                    to="/jobs" 
                    className="text-gray-300 hover:text-indigo-400 transition"
                  >
                    Jobs
                  </Link>
                  
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold">
                        {userInfo.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-gray-300">{userInfo.name?.split(' ')[0]}</span>
                    </button>
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] rounded-md shadow-lg py-1 z-10 border border-indigo-500/20">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-indigo-400 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-indigo-500/20 bg-[#1E293B]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to={dashboardLink}
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/courses"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    to="/jobs"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-red-400 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-indigo-400 font-medium hover:bg-indigo-500/10 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1E293B]/80 backdrop-blur-sm border-t border-indigo-500/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-sm">© 2026 Edutech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}