// actions/signUp.js
/*
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config'; 

export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // You can now use the user object for further operations, like adding the name to their profile
    return { user, error: null };
  } catch (error) {
    console.error('Error signing up:', error.message);
    // Make sure to return an object with both user and error properties
    return { user: null, error: error.message };
  }
};
*/





// actions/signUp.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const signUp = async (name, email, password) => {
  try {
    // Create user with email and password in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user details in Firestore Database with role set to 'regular'
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: 'regular'
    });

    // Return the user object and error as null for successful registration
    return { user, error: null };
  } catch (error) {
    // Log and return the error message if the registration fails
    console.error('Error signing up:', error.message);
    return { user: null, error: error.message };
  }
};
