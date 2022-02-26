
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import { getDatabase, ref, set, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyAQt-Has-yWfktUqkHm8zDd7vgSaj6HNUE",
  authDomain: "iatc-1abb2.firebaseapp.com",
  databaseURL: "https://iatc-1abb2-default-rtdb.firebaseio.com",
  projectId: "iatc-1abb2",
  storageBucket: "iatc-1abb2.appspot.com",
  messagingSenderId: "318973297846",
  appId: "1:318973297846:web:26827651e0a1e828b35217",
  measurementId: "G-Q2NZ6GRJHS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export {
  ref, set, push, onValue, remove
}