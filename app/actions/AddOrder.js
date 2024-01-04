import { doc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Make sure this path is correct for your setup

// Function to add order details to Firebase
export const addOrderDetails = async (orderData) => {
  try {
    // Add a new document in the 'order-details' collection
    const docRef = await addDoc(collection(db, 'order-details'), orderData);
    console.log('Order details added with ID:', docRef.id);
    return docRef.id; // Returns the newly generated document id
  } catch (error) {
    console.error("Error adding order details: ", error);
    throw new Error(error);
  }
};

