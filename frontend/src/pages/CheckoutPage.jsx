// frontend/src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(sum);
    setGst(sum * 0.18);
  }, []);

  // Recalculate total whenever subtotal, gst, or discount changes
  useEffect(() => {
    setTotal(subtotal + gst - discount);
  }, [subtotal, gst, discount]);

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      const newDiscount = subtotal * 0.1;
      setDiscount(newDiscount);
      alert(`Coupon applied! 10% off: -₹${newDiscount.toFixed(2)}`);
    } else if (couponCode === 'FLAT50') {
      setDiscount(50);
      alert('₹50 off applied');
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1. Create order
      const item = cartItems[0];
      const { data: order } = await api.post('/payments/razorpay/order', { courseId: item.id });

      // 2. Handle Mock vs Real flow
      if (order.mock) {
        // SMART DEMO MODE: Simulate a sleek payment process for the recording
        setLoading(true);
        setTimeout(async () => {
          try {
            const verifyData = {
              razorpay_order_id: order.id,
              razorpay_payment_id: 'pay_mock_' + Math.random().toString(36).substr(2, 9),
              razorpay_signature: 'mock_signature',
              courseId: item.id,
              mock: true
            };
            await api.post('/payments/razorpay/verify', verifyData);
            localStorage.setItem('lastPayment', JSON.stringify({
              paymentId: verifyData.razorpay_payment_id,
              amount: total,
              items: cartItems,
              date: new Date().toISOString()
            }));
            localStorage.removeItem('cart');
            navigate('/payment-success');
          } catch (err) {
            alert('Mock payment failed');
            setLoading(false);
          }
        }, 2000); // 2 second delay to look realistic in the video
        return;
      }

      // REAL RAZORPAY FLOW (Only if keys are valid)
      const options = {
        key: order.key || 'rzp_test_placeholder', 
        amount: order.amount,
        currency: order.currency,
        name: 'Edutech Platform',
        description: `Purchase: ${item.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: item.id,
              mock: false
            };
            await api.post('/payments/razorpay/verify', verifyData);
            localStorage.setItem('lastPayment', JSON.stringify({
              paymentId: response.razorpay_payment_id,
              amount: total,
              items: cartItems,
              date: new Date().toISOString()
            }));
            localStorage.removeItem('cart');
            navigate('/payment-success');
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('userInfo') || '{}').name,
          email: JSON.parse(localStorage.getItem('userInfo') || '{}').email,
        },
        theme: { color: '#6366f1' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert('Could not initiate payment');
    } finally {
      if (!loading) setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p>Your cart is empty. <a href="/courses" style={{ color: 'var(--accent)' }}>Go to courses</a></p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Checkout</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-semibold mb-2">Coupon</h2>
              <div className="flex gap-2">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter code" className="flex-1 px-3 py-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
                <button onClick={applyCoupon} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Apply</button>
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                  <span>Razorpay (Card/UPI/NetBanking)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
                  <span>Stripe (International Cards)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-semibold mb-3">Price Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span>GST (18%)</span><span>₹{gst}</span></div>
                {discount > 0 && <div className="flex justify-between" style={{ color: 'var(--accent)' }}><span>Discount</span><span>- ₹{discount}</span></div>}
                <div className="flex justify-between font-bold pt-2 border-t"><span>Total</span><span>₹{total}</span></div>
              </div>
              <button onClick={initiatePayment} disabled={loading} className="w-full mt-4 py-2 rounded-lg font-semibold disabled:opacity-50" style={{ background: 'var(--accent)', color: 'white' }}>
                {loading ? 'Processing...' : `Pay ₹${total}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}