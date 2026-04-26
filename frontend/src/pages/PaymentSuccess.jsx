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

      // Save enrolled courses to localStorage for dashboard
      const existingEnrollments = localStorage.getItem('enrolledCourses');
      let enrolled = existingEnrollments ? JSON.parse(existingEnrollments) : [];
      paymentData.items.forEach(item => {
        if (!enrolled.some(c => c.id === item.id)) {
          enrolled.push({
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail || 'https://via.placeholder.com/300x150'
          });
        }
      });
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
      console.log('Enrolled courses saved:', enrolled);

      // Optionally clear lastPayment so it's not reused
      // localStorage.removeItem('lastPayment');
    } else {
      // If no payment info, redirect after a few seconds
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
          <h1 className="text-2xl font-bold">No payment info found</h1>
          <p>Redirecting to dashboard...</p>
          <Link to="/dashboard" className="inline-block px-6 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Go to Dashboard</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Payment Successful!</h1>
        <p>Your transaction ID: <strong>{payment.paymentId}</strong></p>
        <div className="p-4 rounded-xl text-left" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <p className="font-semibold mb-2">You've purchased:</p>
          <ul className="list-disc list-inside space-y-1">
            {payment.items.map(item => <li key={item.id}>{item.title} (₹{item.price})</li>)}
          </ul>
          <p className="mt-3">Total paid: <strong>₹{payment.amount}</strong></p>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={downloadInvoice} className="px-6 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Download Invoice (PDF)</button>
          <Link to="/dashboard" className="px-6 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--text-h)' }}>Go to Dashboard</Link>
        </div>
      </div>
    </Layout>
  );
}