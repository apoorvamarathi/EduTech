// // frontend/src/pages/AdminPayments.jsx
// import React, { useState, useEffect } from 'react';
// import Layout from '../components/Layout';

// export default function AdminPayments() {
//   const [transactions, setTransactions] = useState([]);
//   const [refundRequests, setRefundRequests] = useState([]);
//   useEffect(() => {
//     // Mock data
//     setTransactions([
//       { id: 'TXN001', user: 'john@example.com', amount: 649, date: '2025-04-01', status: 'success', type: 'course' },
//       { id: 'TXN002', user: 'jane@example.com', amount: 299, date: '2025-04-05', status: 'success', type: 'course' },
//     ]);
//     setRefundRequests([
//       { id: 'REF001', transactionId: 'TXN001', user: 'john@example.com', amount: 649, reason: 'Accidental purchase', status: 'pending' },
//     ]);
//   }, []);

//   const approveRefund = (refundId) => {
//     alert(`Refund ${refundId} approved (mock)`);
//   };

//   return (
//     <Layout>
//       <div className="space-y-8">
//         <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Payment Management</h1>
        
//         {/* Overview stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//             <p className="text-sm">Total Revenue</p>
//             <p className="text-2xl font-bold">₹48,200</p>
//           </div>
//           <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//             <p className="text-sm">Platform Fee</p>
//             <p className="text-2xl font-bold">₹14,460</p>
//           </div>
//           <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//             <p className="text-sm">Instructor Payouts</p>
//             <p className="text-2xl font-bold">₹33,740</p>
//           </div>
//         </div>

//         {/* Transactions */}
//         <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//           <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr style={{ borderBottom: '1px solid var(--border)' }}>
//                   <th className="text-left py-2">ID</th><th>User</th><th>Amount</th><th>Date</th><th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactions.map(tx => (
//                   <tr key={tx.id} style={{ borderBottom: '1px solid var(--border)' }}>
//                     <td className="py-2">{tx.id}</td><td>{tx.user}</td><td>₹{tx.amount}</td><td>{tx.date}</td>
//                     <td><span className="text-green-600">✓ {tx.status}</span></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Refund Requests */}
//         <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//           <h2 className="text-xl font-semibold mb-3">Refund Requests</h2>
//           {refundRequests.length === 0 ? <p>No pending refunds</p> : (
//             <div className="space-y-3">
//               {refundRequests.map(req => (
//                 <div key={req.id} className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium">{req.user}</p>
//                     <p className="text-xs">Transaction: {req.transactionId} - Reason: {req.reason}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button onClick={() => approveRefund(req.id)} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Approve</button>
//                     <button className="px-3 py-1 rounded-lg text-sm border" style={{ borderColor: 'var(--border)' }}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

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
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-500 mt-1">Monitor revenue, transactions, and refunds</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹48,200</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Platform Fee</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹14,460</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Instructor Payouts</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹33,740</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-gray-700">{tx.id}</td>
                    <td className="py-3 px-4 text-gray-700">{tx.user}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">₹{tx.amount}</td>
                    <td className="py-3 px-4 text-gray-500">{tx.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Refund Requests</h2>
          </div>
          <div className="p-5">
            {refundRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No pending refunds</p>
            ) : (
              <div className="space-y-4">
                {refundRequests.map(req => (
                  <div key={req.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{req.user}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Transaction: {req.transactionId} · Reason: {req.reason} · Amount: ₹{req.amount}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveRefund(req.id)}
                        className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Approve
                      </button>
                      <button className="px-3 py-1 rounded-md text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
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