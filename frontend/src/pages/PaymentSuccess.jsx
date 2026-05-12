


// frontend/src/pages/PaymentSuccess.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function PaymentSuccess() {
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lastPayment = localStorage.getItem('lastPayment');
    console.log('PaymentSuccess read lastPayment:', lastPayment);
    if (lastPayment) {
      const paymentData = JSON.parse(lastPayment);
      setPayment(paymentData);

      const existingEnrollments = localStorage.getItem('enrolledCourses');
      let enrolled = existingEnrollments ? JSON.parse(existingEnrollments) : [];
      paymentData.items.forEach(item => {
        if (!enrolled.some(c => c.id === item.id)) {
          enrolled.push({
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=300&h=150&fit=crop'
          });
        }
      });
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      console.log('Enrolled courses saved:', enrolled);
    } else {
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  }, [navigate]);

  const downloadInvoice = () => {
    alert('Invoice download started – implement API call to generate PDF');
  };

  if (!payment) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center space-y-6 py-20">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-white">No payment info found</h1>
          <p className="text-gray-400">Redirecting to dashboard...</p>
          <Link to="/dashboard" className="inline-block px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Go to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
        <div className="text-7xl">🎉</div>
        <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
        <p className="text-gray-400">Your transaction ID: <strong className="text-indigo-400">{payment.paymentId}</strong></p>
        <div className="p-6 rounded-xl text-left bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <p className="font-semibold mb-3 text-white">You've purchased:</p>
          <ul className="space-y-2">
            {payment.items.map(item => (
              <li key={item.id} className="text-gray-300">✓ {item.title} <span className="text-indigo-400">(₹{item.price})</span></li>
            ))}
          </ul>
          <p className="mt-4 pt-3 border-t border-indigo-500/20 text-white">
            Total paid: <strong className="text-indigo-400 text-xl">₹{payment.amount}</strong>
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={downloadInvoice} 
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
          >
            Download Invoice (PDF)
          </button>
          <Link 
            to="/dashboard" 
            className="px-6 py-2 rounded-lg border border-indigo-500/30 text-gray-300 hover:bg-indigo-500/10 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}


