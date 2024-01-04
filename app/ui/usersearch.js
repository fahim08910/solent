/*"use client"
import React, { useState } from 'react';
import { searchItems } from '../actions/Search';

const UserSearchComponent = () => {
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');
    const response = await searchItems({ type, manufacturer });

    if (response.success) {
      setItems(response.items);
    } else {
      setError(response.error);
      setItems([]);
    }
  };

  return (
    <div style={styles.searchContainer}>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <div style={styles.searchBar}>
          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.dropdown}>
            <option value="">Select Type</option>
            <option value="Apparel">Apparel</option>
            <option value="Stationery">Stationery</option>
            <option value="Electronics">Electronics</option>
          </select>
          <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} style={styles.dropdown}>
            <option value="">Select Manufacturer</option>
            <option value="Techwise">Techwise</option>
            <option value="StudyPro">StudyPro</option>
            <option value="Solent Gear">Solent Gear</option>
          </select>
          <button type="submit" style={styles.searchButton}>Search</button>
        </div>
      </form>
      <div style={styles.resultsContainer}>
        {items.map((item) => (
          <div key={item.id} style={styles.resultItem}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Type: {item.type}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    searchContainer: {
      maxWidth: '1000px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    },
    errorMessage: {
      backgroundColor: '#ffcccc',
      color: '#333',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '20px',
    },
    searchForm: {
      display: 'flex',
      justifyContent: 'center',
    },
    searchBar: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    
    dropdown: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: '#f8f8f8',
      width: '200px', // Make dropdowns the same width as the button
    },
    searchButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: '150px', // Fixed width for the button
    },
    resultsContainer: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
      gap: '10px',
    },
    resultItem: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  };

export default UserSearchComponent;*/







//-----------------------------------------------------------------

/*

"use client"
import React, { useState } from 'react';
import { searchItems } from '../actions/Search';

const UserSearchComponent = () => {
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');
    const response = await searchItems({ type, manufacturer });

    if (response.success) {
      setItems(response.items);
    } else {
      setError(response.error);
      setItems([]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <div style={styles.searchBar}>
            <select value={type} onChange={(e) => setType(e.target.value)} style={styles.dropdown}>
            <option value="">Select Type</option>
            <option value="Apparel">Apparel</option>
            <option value="Stationery">Stationery</option>
            <option value="Electronics">Electronics</option>
            </select>
            <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} style={styles.dropdown}>
            <option value="">Select Manufacturer</option>
            <option value="Techwise">Techwise</option>
            <option value="StudyPro">StudyPro</option>
            <option value="Solent Gear">Solent Gear</option>
            </select>
            <button type="submit" style={styles.searchButton}>Search</button>
          </div>
        </form>
      </div>
      <div style={styles.resultsContainer}>
        {items.map((item) => (
          <div key={item.id} style={styles.resultItem}>
            <h3 style={styles.itemName}>{item.name}</h3>
            <p>{item.description}</p>
            <p>Type: {item.type}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Price: {item.price}</p>
            <button style={styles.addToCartButton}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    searchContainer: {
      maxWidth: '100%',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },














    
      errorMessage: {
        backgroundColor: '#ffcccc',
        color: '#333',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
      },
      searchForm: {
        display: 'flex',
        justifyContent: 'center',
      },
      searchBar: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      },
      
      dropdown: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        backgroundColor: '#f8f8f8',
        width: '200px', // Make dropdowns the same width as the button
      },
      searchButton: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '150px', // Fixed width for the button
      },
      resultsContainer: {
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
        gap: '10px',
      },
      resultItem: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },

    resultsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#fff',
    },
    resultItem: {
      flexBasis: 'calc(33% - 20px)',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    itemName: {
      color: '#333',
      marginBottom: '5px',
    },
    addToCartButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      alignSelf: 'start',
    },
};

export default UserSearchComponent;

---------------------------------------------------------------------------------
/*
// UserSearchComponent.js
/*
"use client"
import React, { useState } from 'react';
import { searchItems } from '../actions/Search'; // Make sure this function is defined and works as expected
import BasketComponent from './BasketComponent'; // Import the BasketComponent

const UserSearchComponent = () => {
  // State for the type and manufacturer filters
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [items, setItems] = useState([]); // State to hold the search results
  const [error, setError] = useState(''); // State to hold any error messages
  const [basket, setBasket] = useState([]); // State for the basket

  // Function to handle search operation
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    setError(''); // Clear any previous errors

    try {
      const response = await searchItems({ type, manufacturer });
      if (response.success) {
        setItems(response.items); // Update the items state with the search results
      } else {
        setError(response.error); // Set error message if the search was not successful
        setItems([]); // Clear the previous search results
      }
    } catch (error) {
      setError('Failed to fetch items.'); // Handle errors like network issues
    }
  };

  // Function to add items to the basket
  const handleAddToBasket = (item) => {
    setBasket((prevBasket) => [...prevBasket, item]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          
          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.dropdown}>
          <option value="">Select Type</option>
            <option value="Apparel">Apparel</option>
            <option value="Stationery">Stationery</option>
            <option value="Electronics">Electronics</option>
          </select>
          <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} style={styles.dropdown}>
          <option value="">Select Manufacturer</option>
            <option value="Techwise">Techwise</option>
            <option value="StudyPro">StudyPro</option>
            <option value="Solent Gear">Solent Gear</option>
          </select>
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
      </div>
      <div style={styles.resultsContainer}>
        {items.map((item) => (
          <div key={item.id} style={styles.resultItem}>
            <h3 style={styles.itemName}>{item.name}</h3>
            <button style={styles.addToCartButton} onClick={() => handleAddToBasket(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <BasketComponent basket={basket} />
    </div>
  );
};

// Define styles here or in your CSS and remove this part
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    searchContainer: {
      maxWidth: '100%',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },














    
      errorMessage: {
        backgroundColor: '#ffcccc',
        color: '#333',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
      },
      searchForm: {
        display: 'flex',
        justifyContent: 'center',
      },
      searchBar: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      },
      
      dropdown: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        backgroundColor: '#f8f8f8',
        width: '200px', // Make dropdowns the same width as the button
      },
      searchButton: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '150px', // Fixed width for the button
      },
      resultsContainer: {
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
        gap: '10px',
      },
      resultItem: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },

    resultsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#fff',
    },
    resultItem: {
      flexBasis: 'calc(33% - 20px)',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    itemName: {
      color: '#333',
      marginBottom: '5px',
    },
    addToCartButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      alignSelf: 'start',
    },
};

export default UserSearchComponent;

*/
// UserSearchComponent.js
// UserSearchComponent.js







//ALMOST FINAL CODE*****
/*
"use client"
import React, { useState, useEffect } from 'react';
import { searchItems } from '../actions/userSearch';
const UserSearchComponent = () => {
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [items, setItems] = useState([]);
  const [basketItems, setBasketItems] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket).map(item => item.id) : []; 
  });

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await searchItems({ type, manufacturer });
    if (response.success) {
      setItems(response.items);
    } else {
      setItems([]);
    }
  };

  const handleAddToBasket = (item) => {
    const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];
    const updatedBasket = [...currentBasket, item];
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    setBasketItems(prev => [...prev, item.id]);
  };

  useEffect(() => {
    const updateBasketItems = () => {
      const savedBasket = JSON.parse(localStorage.getItem('basket'));
      setBasketItems(savedBasket ? savedBasket.map(item => item.id) : []);
    };
    window.addEventListener('storage', updateBasketItems);
    return () => window.removeEventListener('storage', updateBasketItems);
  }, []);

  return (
    <div>
      <h1>Search for Items</h1>
      <form onSubmit={handleSearch}>
        
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Apparel">Apparel</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
        </select>

        
        <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
          <option value="">Select Manufacturer</option>
          <option value="Techwise">Techwise</option>
          <option value="StudyPro">StudyPro</option>
          <option value="Solent Gear">Solent Gear</option>
        </select>

       
        <button type="submit">Search</button>
      </form>
        {items.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <button
              onClick={() => handleAddToBasket(item)}
              disabled={basketItems.includes(item.id)}
              style={{ backgroundColor: basketItems.includes(item.id) ? 'grey' : 'blue' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
  );
};

export default UserSearchComponent;



*/


"use client"
import React, { useState, useEffect } from 'react';
import { searchItems } from '../actions/userSearch';

const UserSearchComponent = () => {
  const [type, setType] = useState(() => typeof window !== "undefined" ? localStorage.getItem('type') || '' : '');
  const [manufacturer, setManufacturer] = useState(() => typeof window !== "undefined" ? localStorage.getItem('manufacturer') || '' : '');
  const [items, setItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBasket = localStorage.getItem('basket');
      setBasketItems(savedBasket ? JSON.parse(savedBasket).map(item => item.id) : []);
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearched(true);
    const response = await searchItems({ type, manufacturer });
    setItems(response.success ? response.items : []);
    if (typeof window !== "undefined") {
      localStorage.setItem('type', type);
      localStorage.setItem('manufacturer', manufacturer);
    }
  };

  const handleAddToBasket = (item) => {
    if (typeof window !== "undefined") {
      const currentBasket = JSON.parse(localStorage.getItem('basket')) || [];
      const updatedBasket = [...currentBasket, item];
      localStorage.setItem('basket', JSON.stringify(updatedBasket));
      setBasketItems(prev => [...prev, item.id]);
    }
  };

  const styles = {
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      marginTop: '15px',
    },
    noProducts: {
      display: 'flex',
      justifyContent: 'center', // Centers children horizontally in the container
      alignItems: 'center', // Centers children vertically in the container
      height: '10vh', // Adjust based on your need
      width: '100%', // Ensures container takes the full width
      textAlign: 'center', // Ensures text is centered within its content box
      margin: '0', // Resets any default margin
      padding: '0', // Resets any default padding
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgb(210, 210, 210)',
      marginTop: '20px',
      
    },
    button: (isInBasket) => ({
      padding: '10px 20px',
      marginTop: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: isInBasket ? 'grey' : 'blue',
      color: 'white',
      border: 'none',
    }),
    form: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      cursor: 'pointer',
      width: '150px', // Adjust the width as needed
    },
    searchButton: {
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      width: '120px', // Adjust the width as needed
    },
    
  };
  const gridContainerStyle = items.length > 0 ? styles.gridContainer : {...styles.gridContainer, ...styles.noProducts};
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Search for Products</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
          <option value="">Select Type</option>
          <option value="Apparel">Apparel</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
        </select>
  
        <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} style={styles.select}>
          <option value="">Select Manufacturer</option>
          <option value="Techwise">Techwise</option>
          <option value="StudyPro">StudyPro</option>
          <option value="Solent Gear">Solent Gear</option>
        </select>
  
        <button type="submit" style={styles.searchButton}>Search</button>
      </form>
      <div style={gridContainerStyle}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} style={styles.card}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Type: {item.type}</p>
              <p>Manufacturer: {item.manufacturer}</p>
              <p>Price: {item.price}</p>
              <button
                onClick={() => handleAddToBasket(item)}
                disabled={basketItems.includes(item.id)}
                style={styles.button(basketItems.includes(item.id))}
              >
                Add to Cart
              </button>
            </div>
          ))
          ) : searched && (
            <div>
              No products found with type '{type}' and manufacturer '{manufacturer}'.
            </div>
        )}
      </div>
    </div>
  );  
        }
export default UserSearchComponent;
