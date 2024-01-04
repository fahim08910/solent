
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const addProduct = async (productData) => {
  try {
    // Check if a product with the same name already exists
    const q = query(collection(db, "products"), where("name", "==", productData.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Product with the same name exists
      return { success: false, id: null, message: 'A product with the same name already exists.' };
    }

    // Add a new product if it doesn't exist
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID: ", docRef.id);
    return { success: true, id: docRef.id, message: `Product added successfully with ID: ${docRef.id}` };
  } catch (error) {
    console.error("Error adding product: ", error);
    return { success: false, id: null, message: `Error adding product: ${error.message}` };
  }
};




/*
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase/config'; // Make sure this path is correct
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Helper function to upload image and return the URL
const uploadImage = async (imageFile) => {
  if (!imageFile) {
    console.error("No image file provided");
    return null; // or throw an error if you prefer
  }

  // Adjust path as needed to avoid conflicts and handle file naming appropriately
  const storageRef = ref(storage, `product-images/${new Date().getTime()}-${imageFile.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

export const addProduct = async (productData, imageFile) => {
  try {
    // First, check if a product with the same title already exists
    const q = query(collection(db, "products"), where("title", "==", productData.title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Product with the same title exists
      return { success: false, id: null, message: 'A product with the same title already exists.' };
    }

    // Upload the image and get the URL
    const imageUrl = await uploadImage(imageFile);
    if (!imageUrl) {
      // Detailed error handling or logging can be added here
      return { success: false, id: null, message: 'Failed to upload image.' };
    }

    // Include the image URL in the product data
    const newProductData = {
      ...productData,
      imageUrl: imageUrl // Ensure your database schema expects this field
    };

    // Add a new product with the image URL
    const docRef = await addDoc(collection(db, "products"), newProductData);
    console.log("Product added with ID: ", docRef.id);
    return { success: true, id: docRef.id, message: `Product added successfully with ID: ${docRef.id}` };
  } catch (error) {
    console.error("Error adding product: ", error);
    return { success: false, id: null, message: `Error adding product: ${error.message}` };
  }
};
*/