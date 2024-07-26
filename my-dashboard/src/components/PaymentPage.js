// PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, programId, programName } = location.state; // get passed state from navigation

  const [paymentOption, setPaymentOption] = useState('full');
  const [reconfirm, setReconfirm] = useState(false);
  const [amount, setAmount] = useState(3999);

  useEffect(() => {
    if (paymentOption === 'full') {
      setAmount(3999);
    } else {
      setAmount(1999);
    }
  }, [paymentOption]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!reconfirm) {
      alert('Please confirm your payment.');
      return;
    }

    // Here you would typically send the payment details to your backend
    try {
      const response = await axios.post('http://localhost:5000/payment', {
        email,
        programId,
        programName,
        paymentOption,
        amount,
      });

      alert('Payment successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
        <div>
          <label>Program ID:</label>
          <input type="text" value={programId} readOnly />
        </div>
        <div>
          <label>Program Name:</label>
          <input type="text" value={programName} readOnly />
        </div>
        <div>
          <label>Payment Option:</label>
          <select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
            <option value="full">Full Payment - 3999 INR</option>
            <option value="installment">Installment Payment - 1999 INR (First Installment)</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input type="text" value={amount} readOnly />
        </div>
        <div>
          <input type="checkbox" checked={reconfirm} onChange={(e) => setReconfirm(e.target.checked)} />
          <label>Confirm Payment</label>
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
