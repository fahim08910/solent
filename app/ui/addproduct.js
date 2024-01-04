"use client"
import React, { useState } from 'react';
import { addProduct } from '../actions/addProduct'; // Adjust the path as needed

const AddProductComponent = () => {
  // Changed all instances of 'title' to 'name'
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    // Validation now checks for name instead of title
    if (!name || !description || !type || !manufacturer || isNaN(numericQuantity) || isNaN(numericPrice) || numericQuantity <= 0 || numericPrice <= 0) {
      setMessage({ text: 'All fields are required and quantity/price must be positive numbers.', isError: true });
      return;
    }

    // Product data now uses name instead of title
    const productData = {
      name,
      description,
      type,
      manufacturer,
      quantity: numericQuantity,
      price: `£${numericPrice.toFixed(2)}`
    };

    const response = await addProduct(productData);
    setMessage({ text: response.message, isError: !response.success });
  };

  // Styles remain the same
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '4px',
      backgroundColor: '#5cb85c',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    message: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: message.isError ? '#f8d7da' : '#d4edda',
      color: message.isError ? '#721c24' : '#155724',
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      {message.text && <p style={styles.message}>{message.text}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name" // Changed placeholder to Name
          style={styles.input}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={styles.input}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Type</option>
          <option value="Apparel">Apparel</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
        </select>
        <select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Manufacturer</option>
          <option value="Techwise">Techwise</option>
          <option value="StudyPro">StudyPro</option>
          <option value="Solent Gear">Solent Gear</option>
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={styles.input}
          min="1"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          style={styles.input}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductComponent;







/*
"use client"
import React, { useState } from 'react';
import { addProduct } from '../actions/addProduct'; // Adjust the path as needed
import { storage } from '../firebase/config'; // Ensure Firebase Storage is properly configured
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (imageFile) => {
  if (!imageFile) {
    console.error("No image file provided");
    return null;
  }

  const storageRef = ref(storage, `product-images/${imageFile.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

const AddProductComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    if (isNaN(numericQuantity) || isNaN(numericPrice) || numericQuantity <= 0 || numericPrice <= 0) {
      setMessage({ text: 'Quantity and price must be positive numbers.', isError: true });
      setUploading(false);
      return;
    }

    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      setMessage({ text: 'Failed to upload image.', isError: true });
      setUploading(false);
      return;
    }

    const productData = {
      title,
      description,
      type,
      quantity: numericQuantity,
      price: numericPrice.toFixed(2),
      imageUrl
    };

    const response = await addProduct(productData);
    if (response.success) {
      // Reset the form upon successful upload
      setTitle('');
      setDescription('');
      setType('');
      setQuantity('');
      setPrice('');
      setImage(null);
      setImagePreviewUrl('');
    }
    setMessage({ text: response.message, isError: !response.success });
    setUploading(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '4px',
      backgroundColor: '#5cb85c',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    message: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: message.isError ? '#f8d7da' : '#d4edda',
      color: message.isError ? '#721c24' : '#155724',
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      {message.text && <p style={styles.message}>{message.text}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={styles.input}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={styles.input}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Type</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={styles.input}
          min="1"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          style={styles.input}
          min="0.01"
          step="0.01"
          required
        />
        {imagePreviewUrl && (
          <div>
            <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          style={styles.input}
          disabled={uploading}
          required
        />
        <button type="submit" style={styles.button} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductComponent;
*/