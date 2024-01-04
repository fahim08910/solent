/*  import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getUserDetails = async (email) => {
  try {
    const q = query(collection(db, 'card-details'), where('Email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDetails = userDoc.data();
      return { id: userDoc.id, ...userDetails };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};

export const updateUserBalance = async (userId, newBalance) => {
  try {
    const userRef = doc(db, 'card-details', userId);
    await updateDoc(userRef, { Balance: newBalance });
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
};
*/





// checkOut.js

import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to get user details by email
export const getUserDetails = async (email) => {
  try {
    const q = query(collection(db, 'card-details'), where('Email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDetails = userDoc.data();
      return { id: userDoc.id, ...userDetails };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};

// Function to update user balance
export const updateUserBalance = async (userId, newBalance) => {
  try {
    const userRef = doc(db, 'card-details', userId);
    await updateDoc(userRef, { Balance: newBalance });
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
};

// Function to get product details by name
export const getProductDetails = async (productName) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('name', '==', productName));
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data(); // Returns the product details
    } else {
      return null; // Product not found
    }
  } catch (error) {
    console.error('Error getting product details:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};