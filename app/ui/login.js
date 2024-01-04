/* "use client";

import { useState } from 'react';
import logInAction from 'app/actions/logIn';

function LoginForm() {
    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        };

        try {
            const result = await logInAction(formData);
            setLoginMessage(result.message || 'Login successful!');
        } catch (error) {
            setLoginMessage('Login failed: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                Username: <br />
                <input name='username' id='username' /><br />
                Password: <br />
                <input type='password' name='password' id='password' /><br />
                <input type='submit' value='Login' />
            </form>
            {loginMessage && <div>{loginMessage}</div>}
        </div>
    );
}

export default LoginForm; */
// app/ui/login.js
// app/ui/login.js
// app/ui/login.js
/*
"use client";

import { useState } from 'react';
import logInAction from 'app/actions/logIn';

function LoginForm() {
    const [loginMessage, setLoginMessage] = useState('');
    const [email, setEmail] = useState('');        // Added email state
    const [password, setPassword] = useState('');  // Added password state

    const handleSubmit = async (event) => {
        event.preventDefault();

        // You'll want to use email instead of username for Firebase authentication
        const formData = {
            email,    // Changed from username to email
            password,
        };

        try {
            const result = await logInAction(formData);
            setLoginMessage(result.message || 'Login successful!');
            // Redirect to home page or dashboard after successful login
            // You can use Next.js useRouter to redirect like so:
            // useRouter().push('/dashboard');
        } catch (error) {
            setLoginMessage('Login failed: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                Email: <br />
                <input 
                    type='email' 
                    name='email' 
                    id='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br />
                Password: <br />
                <input 
                    type='password' 
                    name='password' 
                    id='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                /><br />
                <input type='submit' value='Login' />
            </form>
            {loginMessage && <div>{loginMessage}</div>}
        </div>
    );
}

export default LoginForm;
*/


// app/ui/LoginForm.js
// app/ui/LoginForm.js
// app/ui/LoginForm.js
/*
"use client"
import React, { useState } from 'react';
import logInAction from '../actions/logIn';
import Link from 'next/link';

const LoginForm = () => {
    const [loginMessage, setLoginMessage] = useState('');
    const [userRole, setUserRole] = useState(null); // Add state to hold user role
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { email, password };

        const result = await logInAction(formData);

        // Update state with the login message and user role
        setLoginMessage(result.message);
        setUserRole(result.role); // Store the user role from result
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {loginMessage && (
                <div>
                    {loginMessage}
                    {userRole === 'admin' && (  // Use userRole to conditionally render the admin link
                        <Link href="/admin">
                            <button>Visit Admin Page</button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default LoginForm;*/






//ALMOST FINAL CODE*****


"use client"
import React, { useState } from 'react';
import logInAction from '../actions/logIn';
import Link from 'next/link';

const LoginForm = ({ onLoginSuccess }) => {
    const [loginMessage, setLoginMessage] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { email, password };
        const result = await logInAction(formData);

        setLoginMessage(result.message);
        setUserRole(result.role);

        if (result.status === "LoggedIn") {
            onLoginSuccess();
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Email:
                    <input 
                        type='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Password:
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <div>{loginMessage}</div>
            {userRole === 'admin' && (
                <Link href="/admin" style={styles.adminButton}>Visit Admin Page</Link>
            )}
        </div>
    );
}
const styles = {
    container: {
        width: '300px',
        margin: 'auto',
        marginTop: '10px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px 0px #00000033'
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '10px'
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    },
    button: {
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#005a9c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    buttonHover: {
        backgroundColor: '#003d73'
    },
    adminLink: {
        marginTop: '20px',
        display: 'block',
        textAlign: 'center'
    },
    adminButton: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50', 
        color: 'white',
        textAlign: 'center',
        textDecoration: 'none',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
};

export default LoginForm; 