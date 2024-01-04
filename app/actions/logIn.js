/*"use server";

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { cookieName, password } from 'app/sharedData.js';
import Database from 'better-sqlite3';

async function logIn(formData) {
    const db = new Database(`${process.cwd()}/resources/wadsongs.db`);
    const session = await getIronSession(cookies(), { password, cookieName });

    const username = formData.username;
    const userPassword = formData.password;

    const stmt = db.prepare("SELECT * FROM ht_users WHERE username = ? AND password = ?");
    const user = stmt.get(username, userPassword);

    if (user) {
        session.username = username;
        await session.save();
        return { status: "LoggedIn", user: username, message: "Login successful!" };
    } else {
        return { status: "Invalid Credentials", message: "Invalid username or password" };
    }
}

export default logIn; */
// actions/logIn.js
// app/actions/logIn.js
/*
import { auth } from '../firebase/config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

async function logIn(formData) {
  const { email, password } = formData;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Handle the successful authentication here.
    const user = userCredential.user;
    // Return the user's email and a success message.
    return { status: "LoggedIn", user: user.email, message: "Login successful!" };
  } catch (error) {
    // Handle errors here, such as wrong password or no user found.
    return { status: "Invalid Credentials", message: error.message };
  }
}

export default logIn;
*/


// app/actions/logIn.js
// app/actions/logIn.js
"use server"
import { auth, db } from '../firebase/config'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const logIn = async (formData) => {
  const { email, password } = formData;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Query the Firestore database for the user's role
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Check the role of the user
      const role = userDoc.data().role;
      let message;
      if (role === 'admin') {
        message = "Logged in as an admin.";
      } else if (role === 'regular') {
        message = "Logged in as a regular user.";
      } else {
        message = "Role not recognized.";
      }
      return { status: "LoggedIn", user: user.email, role, message };
    } else {
      // No document found for the user, handle appropriately
      return { status: "NoRole", message: "User does not have a role assigned." };
    }
  } catch (error) {
    // Handle errors here, such as wrong password or no user found.
    return { status: "Invalid Credentials", message: error.message };
  }
}

export default logIn; 

