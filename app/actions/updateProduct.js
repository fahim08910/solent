import { doc, updateDoc, query, where, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const updateProduct = async (productId, updateData) => {
  try {
    // First, check if the product with the given productId exists
    const productRef = doc(db, "products", productId);
    const docSnap = await getDoc(productRef);

    // If the product doesn't exist, return a message indicating so
    if (!docSnap.exists()) {
      return { success: false, message: 'Cannot find product with this ID.' };
    }

    // Check for existing product with the same name, excluding the current product
    const existingProductQuery = query(
      collection(db, "products"),
      where("name", "==", updateData.name) // Changed from title to name
    );
    const querySnapshot = await getDocs(existingProductQuery);

    // Ensure the product being updated is the only one with this name
    let isUpdatingCurrentProduct = false;
    querySnapshot.forEach((doc) => {
      if (doc.id === productId) isUpdatingCurrentProduct = true;
    });

    if (querySnapshot.size > 1 || (querySnapshot.size === 1 && !isUpdatingCurrentProduct)) {
      return { success: false, message: 'A product with the same name already exists.' }; // Changed message to reflect name
    }

    // Update the product if name is unique or the same product is being updated
    await updateDoc(productRef, updateData);
    console.log("Product updated with ID: ", productId);
    return { success: true, message: 'Product updated successfully.' };
  } catch (error) {
    console.error("Error updating product: ", error);
    return { success: false, error: error.message };
  }
};

