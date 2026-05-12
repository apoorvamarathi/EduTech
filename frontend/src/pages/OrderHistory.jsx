


// frontend/src/pages/OrderHistory.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const mockOrders = [
      { id: 'ORD001', date: '2025-04-01', amount: 649, items: ['React Mastery', 'Node.js API'], status: 'Completed', invoiceUrl: '#' },
      { id: 'ORD002', date: '2025-04-10', amount: 129, items: ['Tailwind CSS'], status: 'Completed', invoiceUrl: '#' },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Order History</h1>
          <p className="text-indigo-300 mt-1">Track your purchases and invoices</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
            <p className="text-gray-400">No orders yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map(order => (
              <div key={order.id} className="p-5 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <p className="font-semibold text-white text-lg">Order #{order.id}</p>
                    <p className="text-sm text-indigo-300 mt-1">📅 {order.date}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-400">₹{order.amount}</p>
                    <span className="inline-flex mt-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      {order.status} ✓
                    </span>
                    <button 
                      className="block text-sm mt-2 text-indigo-400 hover:text-indigo-300 transition underline"
                      onClick={() => alert('Download invoice')}
                    >
                      Download Invoice PDF →
                    </button>
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