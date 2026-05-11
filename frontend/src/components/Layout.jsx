// // frontend/src/components/Layout.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Layout({ children }) {
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
//   const isLoggedIn = !!userInfo.token;

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     navigate('/login');
//   };

//   return (
//     <div className="relative min-h-screen">
//       {/* Animated background */}
//       <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-[var(--accent)]/5 animate-gradient" />
      
//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>Edutech</Link>
//             <div className="flex items-center gap-6">
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/dashboard" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Dashboard</Link>
//                   <Link to="/courses" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Courses</Link>
//                   <Link to="/jobs" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Jobs</Link>
//                   <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium transition" style={{ background: 'var(--accent)', color: 'white' }}>Logout</button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Login</Link>
//                   <Link to="/signup" className="px-4 py-2 rounded-lg text-sm font-medium transition" style={{ background: 'var(--accent)', color: 'white' }}>Sign Up</Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="border-t mt-auto py-6 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
//         <p>© 2026 Edutech. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Edutech
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {isLoggedIn ? (
                <>
<<<<<<< HEAD
                  <Link to={
                    userInfo.role === 'admin' ? '/admin' :
                    userInfo.role === 'instructor' ? '/instructor/earnings' :
                    userInfo.role === 'recruiter' ? '/recruiter/dashboard' :
                    '/dashboard'
                  } className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Dashboard</Link>
                  <Link to={userInfo.role === 'instructor' ? '/instructor' : '/courses'} className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>
                    {userInfo.role === 'instructor' ? 'My Courses' : 'Courses'}
                  </Link>
                  <Link to="/jobs" className="hover:opacity-80" style={{ color: 'var(--text-h)' }}>Jobs</Link>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium transition" style={{ background: 'var(--accent)', color: 'white' }}>Logout</button>
=======
                  <Link to={dashboardLink} className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <Link to="/courses" className="text-gray-700 hover:text-blue-600">
                    Courses
                  </Link>
                  <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
                    Jobs
                  </Link>
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {userInfo.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-gray-700">{userInfo.name?.split(' ')[0]}</span>
                    </button>
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
>>>>>>> 54e06cf2266318920fd5b1fd1021b7e91ef2cb48
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600"
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
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    to={dashboardLink}
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/courses"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    to="/jobs"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-blue-600 font-medium"
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
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2026 Edutech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}