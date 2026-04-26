// frontend/src/pages/AdminPayments.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function AdminPayments() {
  const [transactions, setTransactions] = useState([]);
  const [refundRequests, setRefundRequests] = useState([]);
  useEffect(() => {
    // Mock data
    setTransactions([
      { id: 'TXN001', user: 'john@example.com', amount: 649, date: '2025-04-01', status: 'success', type: 'course' },
      { id: 'TXN002', user: 'jane@example.com', amount: 299, date: '2025-04-05', status: 'success', type: 'course' },
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
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Payment Management</h1>
        
        {/* Overview stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₹48,200</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm">Platform Fee</p>
            <p className="text-2xl font-bold">₹14,460</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="text-sm">Instructor Payouts</p>
            <p className="text-2xl font-bold">₹33,740</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-2">ID</th><th>User</th><th>Amount</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-2">{tx.id}</td><td>{tx.user}</td><td>₹{tx.amount}</td><td>{tx.date}</td>
                    <td><span className="text-green-600">✓ {tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund Requests */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-semibold mb-3">Refund Requests</h2>
          {refundRequests.length === 0 ? <p>No pending refunds</p> : (
            <div className="space-y-3">
              {refundRequests.map(req => (
                <div key={req.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{req.user}</p>
                    <p className="text-xs">Transaction: {req.transactionId} - Reason: {req.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveRefund(req.id)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Approve</button>
                    <button className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}