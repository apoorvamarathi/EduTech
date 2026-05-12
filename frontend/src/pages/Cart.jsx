



// frontend/src/pages/Cart.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([
        { id: 1, title: 'React - The Complete Guide', price: 49, quantity: 1, thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=80&h=80&fit=crop' },
        { id: 2, title: 'Node.js API Mastery', price: 59, quantity: 1, thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=80&h=80&fit=crop' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      alert('Coupon applied! 10% off');
    } else if (couponCode === 'FLAT50') {
      setDiscount(50);
      alert('₹50 off applied');
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst - discount;

  const handleCheckout = () => {
    localStorage.setItem('appliedCoupon', JSON.stringify({ code: couponCode, discount }));
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-20 space-y-4">
          <div className="text-6xl">🛒</div>
          <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
          <p className="text-gray-400">Looks like you haven't added any courses yet.</p>
          <Link to="/courses" className="inline-block px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Browse Courses
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-indigo-400">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-indigo-500/30 text-white hover:bg-indigo-500/20 transition">-</button>
                    <span className="text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-indigo-500/30 text-white hover:bg-indigo-500/20 transition">+</button>
                    <button onClick={() => removeItem(item.id)} className="text-sm ml-4 text-indigo-400 hover:text-indigo-300 transition">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-400">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
              <h2 className="text-lg font-semibold mb-3 text-white">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-indigo-400">
                    <span>Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t border-indigo-500/20 text-white">
                  <span>Total</span>
                  <span className="text-indigo-400">₹{total}</span>
                </div>
              </div>
              
              {/* Coupon input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border bg-[#0F172A] border-indigo-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                <button onClick={applyCoupon} className="px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition">Apply</button>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-4 py-2 rounded-lg font-semibold transition bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}