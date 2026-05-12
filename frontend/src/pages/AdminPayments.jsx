


// frontend/src/pages/AdminPayments.jsx

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function AdminPayments() {
  const [transactions, setTransactions] = useState([]);
  const [refundRequests, setRefundRequests] = useState([]);
  useEffect(() => {
    setTransactions([
      { id: 'TXN001', user: 'john@example.com', amount: 649, date: '2025-04-01', status: 'success', type: 'course' },
      { id: 'TXN002', user: 'jane@example.com', amount: 299, date: '2025-04-05', status: 'success', type: 'course' },
      { id: 'TXN003', user: 'mike@example.com', amount: 49, date: '2025-04-10', status: 'success', type: 'course' },
    ]);
    setRefundRequests([
      { id: 'REF001', transactionId: 'TXN001', user: 'john@example.com', amount: 649, reason: 'Accidental purchase', status: 'pending' },
    ]);
  }, []);

  const approveRefund = (refundId) => {
    alert(`Refund ${refundId} approved (mock)`);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Payment Management</h1>
          <p className="text-indigo-300 mt-1">Monitor revenue, transactions, and refunds</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
            <p className="text-sm text-indigo-300">Total Revenue</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">₹48,200</p>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
            <p className="text-sm text-indigo-300">Platform Fee</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">₹14,460</p>
          </div>
          <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
            <p className="text-sm text-indigo-300">Instructor Payouts</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">₹33,740</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0F172A]/50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-300">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-300">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-300">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-300">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-indigo-500/5 transition">
                    <td className="py-3 px-4 font-mono text-gray-300">{tx.id}</td>
                    <td className="py-3 px-4 text-gray-300">{tx.user}</td>
                    <td className="py-3 px-4 font-medium text-indigo-400">₹{tx.amount}</td>
                    <td className="py-3 px-4 text-gray-400">{tx.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        ✓ {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund Requests */}
        <div className="bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-indigo-500/20">
          <div className="px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-xl font-semibold text-white">Refund Requests</h2>
          </div>
          <div className="p-5">
            {refundRequests.length === 0 ? (
              <p className="text-gray-400 text-center py-6">No pending refunds</p>
            ) : (
              <div className="space-y-4">
                {refundRequests.map(req => (
                  <div key={req.id} className="flex justify-between items-center p-4 bg-[#0F172A]/50 rounded-lg border border-indigo-500/20">
                    <div>
                      <p className="font-medium text-white">{req.user}</p>
                      <p className="text-xs text-indigo-300 mt-0.5">
                        Transaction: {req.transactionId} · Reason: {req.reason} · Amount: ₹{req.amount}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveRefund(req.id)}
                        className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Approve
                      </button>
                      <button className="px-3 py-1 rounded-md text-sm border border-red-500/50 text-red-400 hover:bg-red-500/10 transition">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
