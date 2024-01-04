
/*
import React, { useState } from 'react';
import { addOrderDetails } from '../actions/AddOrder'; 
import { getUserDetails, updateUserBalance } from '../actions/checkOut';
import { updateProductQuantity } from '../actions/updateProductQuantity';

// app/ui/BasketComponent.js
const BasketComponent = ({ basket, removeItem, updateQuantity }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // Helper function to parse prices
  const parsePrice = (priceString) => {
    if (!priceString) return 0; // Return a default value if priceString is undefined or falsy
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };
  

  // Calculate total order price
  const calculateTotalOrderPrice = () => {
    return basket.reduce((total, item) => {
      const price = parsePrice(item.price);
      const quantity = Number(item.buyQuantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const totalOrderPrice = calculateTotalOrderPrice();

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
        let allInStock = true;
        for (let item of basket) {
          const isInStock = await updateProductQuantity(item.name, item.buyQuantity);
          if (!isInStock) {
            alert(`Not enough stock for ${item.name}.`);
            allInStock = false;
            break;
          }
        }

        if (allInStock && (userDetails.Balance >= totalOrderPrice)) {
          const newBalance = userDetails.Balance - totalOrderPrice;
          await updateUserBalance(userDetails.id, newBalance.toString());

          const orderItems = basket.map(item => ({
            name: item.name,
            quantity: Number(item.buyQuantity) || 0,
            price: item.price,
            total: (Number(item.buyQuantity) || 0) * parsePrice(item.price).toFixed(2),
          }));

          const orderData = {
            items: orderItems,
            totalOrderPrice: totalOrderPrice.toFixed(2),
            email: email,
            name: name,
            orderDate: new Date().toISOString()
          };

          const orderId = await addOrderDetails(orderData);
          alert('Order placed successfully! New balance is: £' + newBalance.toFixed(2));
        } else {
          if (!allInStock) {
            alert('Transaction cancelled: One or more items are out of stock.');
          } else {
            alert('Insufficient funds.');
          }
          // Implement rollback logic if necessary
        }
      } else {
        alert('Invalid card details or user not found.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during the checkout process.');
    }
  };

  return (
    <div>
      <h2>Your Basket</h2>
      {basket.map((item, index) => {
        const price = parsePrice(item.price);
        const quantity = Number(item.buyQuantity) || 0;
        const total = price * quantity;
        return (
          <div key={index}>
            <h4>{item.name}</h4>
            <p>Price: £{price.toFixed(2)}</p>
            <div>
              <span>Quantity: {quantity}</span>
              <button onClick={() => updateQuantity(index, 1)}>+</button>
              <button onClick={() => updateQuantity(index, -1)}>-</button>
            </div>
            <p>Total Price: £{total.toFixed(2)}</p>
            <button onClick={() => removeItem(index)}>Remove</button>
          </div>
        );
      })}

      <h3>Total Order Price: £{totalOrderPrice.toFixed(2)}</h3>
      <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
      {showCheckout && (
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
      )}

      {basket.length === 0 && <p>Your basket is empty.</p>}
    </div>
  );
};

export default BasketComponent;

*/

import React, { useState, useRef } from 'react'; 
import { addOrderDetails } from '../actions/AddOrder'; 
import { getUserDetails, updateUserBalance } from '../actions/checkOut';
import { updateProductQuantity } from '../actions/updateProductQuantity';

const style = {
  container: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    width: '80%',
    margin: '30px auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  item: {
    borderBottom: '1px solid #eee',
    paddingBottom: '20px', // Increased padding for more space around items
    marginBottom: '20px', // Increased margin for more space between items
    backgroundColor: '#f9f9f9', // Light background color for each item
    borderRadius: '8px', // Rounded corners for the item container
    padding: '10px', // Padding inside each item container
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  itemDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '16px',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityBtn: {
    padding: '5px 10px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  removeBtn: {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px',
  },
  total: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: '20px',
  },
  checkoutBtn: {
    backgroundColor: '#00C851',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: '20px',
  },
  formContainer: {
    padding: '2rem', // Adequate padding around the form elements
    background: '#fff', // White background for the form
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '10px', // Smoothly rounded corners for the form container
    maxWidth: '500px', // Max width of the form for better aesthetics
    margin: '2rem auto', // Margin for auto centering in the parent container
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Form takes the full width of the formContainer
  },
  formField: {
    display: 'flex',
    flexDirection: 'column', // Stack input and label vertically
    width: '100%', // Each form field takes the full width of the form
    marginBottom: '1rem', // Space between each form field
  },
  label: {
    marginBottom: '0.5rem', // Space between label and input field
    fontSize: '1rem', // Font size for labels
    fontWeight: '600', // Slightly bolder labels for better legibility
    color: '#333', // Darker color for labels for contrast
  },
  input: {
    padding: '0.75rem', // Adequate padding within the input fields
    border: '1px solid #ccc', // Subtle border for the inputs
    borderRadius: '5px', // Gently rounded corners for the inputs
    fontSize: '1rem', // Font size for input text
    lineHeight: '1.5', // Line height for better readability
  },
  submitBtn: {
    padding: '0.75rem 1.5rem', // Padding for the button
    backgroundColor: '#007bff', // A pleasant shade of blue for the button
    color: 'white', // Text color for the button
    fontSize: '1rem', // Font size for the button text
    borderRadius: '5px', // Match input border radius
    border: 'none', // No border for a button
    cursor: 'pointer',
    margin: '1rem 0', // Margin at the top and bottom for spacing
    width: 'auto', // Auto width based on content and padding
    alignSelf: 'center', // Center the button within the form
    // Remove maxWidth to allow the button to size with padding and content
  },
  removeBtn: {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px',
    // Set a fixed width for the remove button
    width: '100px', // Adjust this as needed
  },
  checkoutBtn: {
    backgroundColor: '#00C851',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    // Remove the full width and align to the right
    display: 'inline-block', // Changed from block to inline-block
    // Set a fixed width for the checkout button
    width: '200px', // Adjust this as needed
    marginLeft: 'auto', // This will align the button to the right
    marginRight: '0',
  },
  submitBtn: {
    backgroundColor: '#33b5e5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    maxWidth: '200px', // Match the max width with the input fields for consistency
    margin: '20px auto', // Center the button below the form fields
    display: 'block',
    // Set a fixed width for the submit button
    
  },
  // Add this for alignment of the buttons to the right
  buttonContainer: {
    textAlign: 'right', // This aligns the child inline-block elements to the right
  },
};
const BasketComponent = ({ basket, removeItem, updateQuantity, clearBasket }) => {
  const checkoutFormRef = useRef(null); // useRef hook to create the ref
  const [showCheckout, setShowCheckout] = useState(false);
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };

  const calculateTotalOrderPrice = () => {
    return basket.reduce((total, item) => {
      const price = parsePrice(item.price);
      const quantity = Number(item.buyQuantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const totalOrderPrice = calculateTotalOrderPrice();
  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    // We use a timeout to ensure state has been updated
    setTimeout(() => {
      checkoutFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };
  const handleCheckout = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const cardNumber = formData.get('card-details');
    const cvv = formData.get('card-cvv');

    try {
      const userDetails = await getUserDetails(email);
      if (userDetails && userDetails['Card Number'] === cardNumber && userDetails.CVV === cvv && userDetails.Name === name) {
        let allInStock = true;
        for (let item of basket) {
          const isInStock = await updateProductQuantity(item.name, item.buyQuantity);
          if (!isInStock) {
            alert(`Not enough stock for ${item.name}.`);
            allInStock = false;
            break;
          }
        }

        if (allInStock && (userDetails.Balance >= totalOrderPrice)) {
          const newBalance = userDetails.Balance - totalOrderPrice;
          await updateUserBalance(userDetails.id, newBalance.toString());

          const orderItems = basket.map(item => ({
            name: item.name,
            quantity: Number(item.buyQuantity) || 0,
            price: item.price,
            total: (Number(item.buyQuantity) || 0) * parsePrice(item.price).toFixed(2),
          }));

          const orderData = {
            items: orderItems,
            totalOrderPrice: totalOrderPrice.toFixed(2),
            email: email,
            name: name,
            orderDate: new Date().toISOString()
          };

          await addOrderDetails(orderData);
          alert('Order placed successfully! New balance is: £' + newBalance.toFixed(2));
          clearBasket();  // Clear the basket after successful order placement
          setShowCheckout(false); // Optionally hide checkout form
        } else {
          if (!allInStock) {
            alert('Transaction cancelled: One or more items are out of stock.');
          } else {
            alert('Insufficient funds.');
          }
        }
      } else {
        alert('Invalid card details or user not found.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during the checkout process.');
    }
  };
  
  

  return (
    <div style={style.container}>
    <h2 style={style.header}>Your Basket</h2>
      {basket.length > 0 ? (
        <>
          {basket.map((item, index) => (
            <div style={style.item} key={index}>
              <h4 style={style.itemName}>{item.name}</h4>
              <div style={style.itemDetails}>
                <p style={style.price}>Price: £{parsePrice(item.price).toFixed(2)}</p>
                <div style={style.quantity}>
                  <button style={style.quantityBtn} onClick={() => updateQuantity(index, -1)}>-</button>
                  <span>{Number(item.buyQuantity) || 0}</span>
                  <button style={style.quantityBtn} onClick={() => updateQuantity(index, 1)}>+</button>
                </div>
                <p>Total: £{(parsePrice(item.price) * (Number(item.buyQuantity) || 0)).toFixed(2)}</p>
                <button style={style.removeBtn} onClick={() => removeItem(index)}>Remove</button>
              </div>
            </div>
          ))}
          <h3 style={style.total}>Total Order Price: £{totalOrderPrice.toFixed(2)}</h3>
          <div style={style.buttonContainer}>
            <button
              style={style.checkoutBtn}
              onClick={() => {
                setShowCheckout(true);
                // Use a timeout to ensure the checkout form is in the DOM
                setTimeout(() => {
                  checkoutFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 0);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your basket is empty.</p>
      )}
      {showCheckout && (
        
        <div style={style.formContainer}>
        <form ref={checkoutFormRef} style={style.form} onSubmit={handleCheckout}>
          <div style={style.formField}>
            <label style={style.label} htmlFor="name">Your Name:</label>
            <input style={style.input} type="text" id="name" name="name" required />
          </div>
          <div style={style.formField}>
            <label style={style.label} htmlFor="email">Email:</label>
            <input style={style.input} type="email" id="email" name="email" required />
          </div>
          <div style={style.formField}>
            <label style={style.label} htmlFor="card-details">Card number:</label>
            <input style={style.input} type="text" id="card-details" name="card-details" required />
          </div>
          <div style={style.formField}>
            <label style={style.label} htmlFor="card-cvv">CVV:</label>
            <input style={style.input} type="text" id="card-cvv" name="card-cvv" required />
          </div>
          <button style={style.submitBtn} type="submit">Submit Order</button>
        </form>
      </div>
      )}
    </div>
  );
  
};

export default BasketComponent;