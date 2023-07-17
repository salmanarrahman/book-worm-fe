// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1w0qPt_f59SaPrXzuuUpiYkzD46cEG1U",
  authDomain: "book-worm-41099.firebaseapp.com",
  projectId: "book-worm-41099",
  storageBucket: "book-worm-41099.appspot.com",
  messagingSenderId: "815424117549",
  appId: "1:815424117549:web:3c6d0d5ba3f9c642ca11a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;