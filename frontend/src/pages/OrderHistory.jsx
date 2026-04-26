// frontend/src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch from API
    const mockOrders = [
      { id: 'ORD001', date: '2025-04-01', amount: 649, items: ['React Mastery', 'Node.js API'], status: 'Completed', invoiceUrl: '#' },
      { id: 'ORD002', date: '2025-04-10', amount: 129, items: ['Tailwind CSS'], status: 'Completed', invoiceUrl: '#' },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Order History</h1>
        {orders.length === 0 ? (
          <p style={{ color: 'var(--text)' }}>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-start flex-wrap">
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text-h)' }}>Order #{order.id}</p>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{order.date}</p>
                    <p className="text-sm">{order.items.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: 'var(--text-h)' }}>₹{order.amount}</p>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{order.status}</span>
                    <button className="block text-sm mt-1 underline" style={{ color: 'var(--accent)' }} onClick={() => alert('Download invoice')}>Invoice PDF</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}