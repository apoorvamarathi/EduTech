// frontend/src/pages/PaymentFailed.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function PaymentFailed() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="text-6xl">😞</div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Payment Failed</h1>
        <p style={{ color: 'var(--text)' }}>Something went wrong. Your payment could not be processed.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/cart" className="px-6 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Retry Payment</Link>
          <Link to="/contact" className="px-6 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--text-h)' }}>Contact Support</Link>
        </div>
      </div>
    </Layout>
  );
}