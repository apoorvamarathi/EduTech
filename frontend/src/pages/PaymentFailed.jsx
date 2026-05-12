
// }


// frontend/src/pages/PaymentFailed.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function PaymentFailed() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="text-7xl">😞</div>
        <h1 className="text-3xl font-bold text-white">Payment Failed</h1>
        <p className="text-gray-400">Something went wrong. Your payment could not be processed.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            to="/cart" 
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            Retry Payment
          </Link>
          <Link 
            to="/contact" 
            className="px-6 py-2 rounded-lg border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </Layout>
  );
}
