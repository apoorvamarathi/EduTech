// frontend/src/pages/Cart.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'React - The Complete Guide', price: 49, quantity: 1 },
  ]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon === 'SAVE10') setDiscount(subtotal * 0.1);
    else alert('Invalid coupon');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center py-10" style={{ color: 'var(--text)' }}>Cart is empty</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>Qty: {item.quantity}</span>
                  <button style={{ color: 'var(--accent)' }}>Remove</button>
                </div>
              </div>
            ))}
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
                <button onClick={applyCoupon} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Apply</button>
              </div>
              <div className="space-y-2 text-right">
                <p>Subtotal: ${subtotal}</p>
                <p>Discount: ${discount}</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text-h)' }}>Total: ${total}</p>
              </div>
              <button className="w-full mt-4 py-3 rounded-xl font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Proceed to Payment</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}