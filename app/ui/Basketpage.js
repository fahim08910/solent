/*
"use client"
// use-client.js
import React, { useState, useEffect } from 'react';
import BasketComponent from './BasketComponent'; // Ensure the path is correct for your project structure

const BasketPage = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    const basketData = savedBasket ? JSON.parse(savedBasket) : [];
    // Initialize quantity as a number
    const basketWithCorrectQuantities = basketData.map(item => ({
      ...item,
      buyQuantity: Number(item.buyQuantity) || 1, // default to 1 if not a number
    }));
    setBasket(basketWithCorrectQuantities);
  }, []);

  const removeItem = (indexToRemove) => {
    const newBasket = basket.filter((_, index) => index !== indexToRemove);
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  };

  const updateQuantity = (indexToUpdate, change) => {
    const newBasket = basket.map((item, index) => {
      if (index === indexToUpdate) {
        const newQuantity = Math.max(1, Number(item.buyQuantity) + change);
        return { ...item, buyQuantity: newQuantity };
      }
      return item;
    });
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  };

  return (
    <div>
      <BasketComponent basket={basket} removeItem={removeItem} updateQuantity={updateQuantity} />
    </div>
  );
};

export default BasketPage;
*/
// use-client.js
"use client"
import React, { useState, useEffect } from 'react';
import BasketComponent from './BasketComponent'; // Ensure the path is correct for your project structure

const BasketPage = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    const basketData = savedBasket ? JSON.parse(savedBasket) : [];
    const basketWithCorrectQuantities = basketData.map(item => ({
      ...item,
      buyQuantity: Number(item.buyQuantity) || 1,
    }));
    setBasket(basketWithCorrectQuantities);
  }, []);

  const removeItem = (indexToRemove) => {
    const newBasket = basket.filter((_, index) => index !== indexToRemove);
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  };

  const updateQuantity = (indexToUpdate, change) => {
    const newBasket = basket.map((item, index) => {
      if (index === indexToUpdate) {
        const newQuantity = Math.max(1, Number(item.buyQuantity) + change);
        return { ...item, buyQuantity: newQuantity };
      }
      return item;
    });
    setBasket(newBasket);
    localStorage.setItem('basket', JSON.stringify(newBasket));
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem('basket');
  };

  return (
    <div>
      <BasketComponent basket={basket} removeItem={removeItem} updateQuantity={updateQuantity} clearBasket={clearBasket} />
    </div>
  );
};

export default BasketPage;
