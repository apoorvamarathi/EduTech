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

  // Load cart from localStorage or API
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Sample demo items – replace with real data
      setCartItems([
        { id: 1, title: 'React - The Complete Guide', price: 49, quantity: 1, thumbnail: 'https://via.placeholder.com/80' },
        { id: 2, title: 'Node.js API Mastery', price: 59, quantity: 1, thumbnail: 'https://via.placeholder.com/80' },
      ]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
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
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst - discount;

  const handleCheckout = () => {
    // Optionally save coupon to context/state for checkout page
    localStorage.setItem('appliedCoupon', JSON.stringify({ code: couponCode, discount }));
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-20 space-y-4">
          <div className="text-6xl">🛒</div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Your cart is empty</h1>
          <p style={{ color: 'var(--text)' }}>Looks like you haven't added any courses yet.</p>
          <Link to="/courses" className="inline-block px-6 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>
            Browse Courses
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold" style={{ color: 'var(--text-h)' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border" style={{ borderColor: 'var(--border)' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border" style={{ borderColor: 'var(--border)' }}>+</button>
                    <button onClick={() => removeItem(item.id)} className="text-sm ml-4" style={{ color: 'var(--accent)' }}>Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: 'var(--text-h)' }}>₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-h)' }}>Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--accent)' }}>
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-h)' }}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              
              {/* Coupon input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)' }}
                />
                <button onClick={applyCoupon} className="px-3 py-2 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Apply</button>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                style={{ background: 'var(--accent)', color: 'white' }}
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