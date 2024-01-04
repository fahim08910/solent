import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const searchItems = async ({ name, type, manufacturer }) => {
  try {
    const itemsRef = collection(db, "products");
    let conditions = [];
    
    // Add query conditions based on provided values
    if (name) conditions.push(where("name", "==", name)); 
    if (type) conditions.push(where("type", "==", type));
    if (manufacturer) conditions.push(where("manufacturer", "==", manufacturer));

    // Check if no search criteria are provided
    if (!name && !type && !manufacturer) {
      return { success: false, error: "Please select at least one search criterion." };
    }

    // Define the query with conditions if any are provided
    const q = query(itemsRef, ...conditions);
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    // Return a custom message if no items are found with the given search criteria
    if (items.length === 0) {
      let errorMessage = "Does not find any product";
      if (name) errorMessage += ` with name '${name}'`;
      if (type) errorMessage += (name ? " and" : "") + ` type '${type}'`;
      if (manufacturer) errorMessage += (name || type ? " and" : "") + ` manufacturer '${manufacturer}'`;

      return { success: false, error: errorMessage, items: [] }; // Return an empty items array to clear previous results
    }

    // Return the found items
    return { success: true, items };
  } catch (error) {
    console.error("Error searching items: ", error);
    return { success: false, error: error.message, items: [] }; // Return an empty items array to clear previous results in case of error
  }
};
