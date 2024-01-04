/*
"use client"
import React, { useState } from 'react';
import { signUp } from '../actions/signUp';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false); // New state to track signup success

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(name, email, password);
      console.log('Response from signUp:', response); // Log the response for debugging

      const { user, error } = response;
      if (user) {
        console.log('Signup successful!', user);
        setSignupSuccess(true); // Update the state to indicate success
        setError(null); // Clear any previous errors
      } else if (error) {
        console.error('Signup error:', error);
        setError(error); // Display the error
        setSignupSuccess(false); // Update the state to indicate failure
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred.'); // Display the unexpected error
      setSignupSuccess(false); // Update the state to indicate failure
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      {signupSuccess && <p>Signup successful!.</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SignupComponent;
*/


// SignupComponent.js
"use client"
import React, { useState } from 'react';
import { signUp } from '../actions/signUp';

const SignupComponent = () => {
  // State hooks
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Inline CSS
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Corrected the rgba value
      textAlign: 'center',
      backgroundColor: '#f8f9fa', // Light grey background
      borderColor: '#ced4da', // Slightly darker border color
      border: '1px solid', // Border style
      color: '#495057' // Dark color for the text
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '10px', // Spacing between each input field
    },
    button: {
      padding: '10px 20px',
      color: 'white',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: { 
      backgroundColor: '#0056b3',
    },
    errorMessage: {
      color: '#ff0000',
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null);
    const response = await signUp(name, email, password);
    if (response.user) {
      console.log('Signup successful!', response.user);
      setSignupSuccess(true);
    } else {
      console.error('Signup error:', response.error);
      setError(response.error);
      setSignupSuccess(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
          style={styles.input} 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          style={styles.input} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          style={styles.input} 
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      {signupSuccess && <p style={styles.successMessage}>Signup successful!</p>}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
    </div>
  );
};

export default SignupComponent;

