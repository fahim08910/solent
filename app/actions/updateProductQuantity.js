// updateProductQuantity.js
/*
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Make sure this points to your actual Firebase config file

export const updateProductQuantity = async (productName, quantityToSubtract) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('name', '==', productName));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const productDoc = querySnapshot.docs[0];
      const productData = productDoc.data();
      const newQuantity = productData.quantity - quantityToSubtract;
      if (newQuantity >= 0) {
        await updateDoc(productDoc.ref, { quantity: newQuantity });
      } else {
        throw new Error(`Not enough stock available for ${productName}. Only ${productData.quantity} left.`);
      }
    } else {
      throw new Error(`Product with name ${productName} does not exist.`);
    }
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw error; // This will be caught in the handleCheckout function
  }
};
*/


// updateProductQuantity.js


// app/actions/updateProductQuantity.js

import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to update product quantity
export const updateProductQuantity = async (productName, quantityToSubtract) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('name', '==', productName));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const productDoc = querySnapshot.docs[0];
      const productData = productDoc.data();
      const newQuantity = productData.quantity - quantityToSubtract;
      if (newQuantity >= 0) {
        await updateDoc(productDoc.ref, { quantity: newQuantity });
        return true; // Successfully updated
      } else {
        console.error(`Not enough stock for ${productName}. Only ${productData.quantity} left.`);
        return false; // Not enough stock
      }
    } else {
      console.error(`Product with name ${productName} does not exist.`);
      return false;
    }
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw error;
  }
};
