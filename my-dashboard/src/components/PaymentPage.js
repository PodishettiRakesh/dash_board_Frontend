// PaymentPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Implement the payment logic here
    alert('Payment successful!');
    navigate('/dashboard'); // Redirect to the dashboard after payment
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <p>Complete your payment here.</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
