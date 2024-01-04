// CheckoutForm.js
import React from 'react';
import { getUserDetails, updateUserBalance } from '../actions/checkOut';

const CheckoutForm = ({ setShowCheckout, setCheckoutMessage, clearBasket, totalOrderPrice }) => {
  const handleCheckout = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const cardNumber = formData.get('card-details');
    const cvv = formData.get('card-cvv');

    try {
      const userDetails = await getUserDetails(email);
      if (userDetails &&
          userDetails['Card Number'] === cardNumber &&
          userDetails.CVV === cvv &&
          userDetails.Name === name) {
        const newBalance = Number(userDetails.Balance) - totalOrderPrice;
        if (newBalance >= 0) {
          await updateUserBalance(userDetails.id, newBalance.toString());
          clearBasket(); // Clear the basket after successful checkout
          setShowCheckout(false);
          setCheckoutMessage('Order placed successfully! Your new balance is: £' + newBalance.toFixed(2));
        } else {
          alert('Insufficient funds.'); // Use alert for insufficient funds
        }
      } else {
        alert('Invalid card details.'); // Use alert for invalid card details
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during the checkout process.'); // Use alert for checkout errors
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <div>
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="card-details">Card number:</label>
        <input type="text" id="card-details" name="card-details" required />
      </div>
      <div>
        <label htmlFor="card-cvv">CVV:</label>
        <input type="text" id="card-cvv" name="card-cvv" required />
      </div>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default CheckoutForm;
