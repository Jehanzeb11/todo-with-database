// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiO9tGSQM6vg3cfD9FVrdUq6LmnP4d69c",
  authDomain: "todo-database-8249e.firebaseapp.com",
  projectId: "todo-database-8249e",
  storageBucket: "todo-database-8249e.appspot.com",
  messagingSenderId: "173600435560",
  appId: "1:173600435560:web:8c06abdafc539023f9badd",
  measurementId: "G-0KCBM6B61Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };