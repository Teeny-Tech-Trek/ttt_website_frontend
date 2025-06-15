// src/components/RazorpayCheckoutButton.tsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

interface RazorpayCheckoutButtonProps {
  packageId: string;
  packageName: string;
  description?: string;
  amount: number; // In INR, NOT paise (e.g., 499)
}

const RazorpayCheckoutButton: React.FC<RazorpayCheckoutButtonProps> = ({
  packageId,
  packageName,
  description,
  amount,
}) => {
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Call backend to create Razorpay order
      const res = await api.post(
        '/orders/create-order',
        { package_id: packageId, amount },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const { id: order_id, amount: razorAmount, currency } = res.data;

      // 2. Open Razorpay checkout (default Razorpay modal)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorAmount,
        currency,
        name: 'Teeny Tech Trek',
        description: description || packageName,
        order_id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment
            await api.post(
              '/orders/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                package_id: packageId,
                amount,
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            alert('Payment successful! Access will be activated soon.');
            navigate('/orders'); // Redirect as needed
          } catch (e: any) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          user_id: user?.sub
        },
        theme: { color: '#1976d2' }
        // You can add modal settings if you want, e.g., modal: { ondismiss: ... }
      };
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (e: any) {
      setError('Payment could not be started. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-blue-700 text-white py-3 px-8 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition disabled:opacity-70"
      >
        {loading ? 'Processing...' : `Buy for ₹${amount}`}
      </button>
    </div>
  );
};

export default RazorpayCheckoutButton;
