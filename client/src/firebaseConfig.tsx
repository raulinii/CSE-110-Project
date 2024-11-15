// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0m3BGx6DKaOUFHWBI_wZ2WDOmvpTer44",
  authDomain: "mindfulu-110.firebaseapp.com",
  projectId: "mindfulu-110",
  storageBucket: "mindfulu-110.firebasestorage.app",
  messagingSenderId: "882268193601",
  appId: "1:882268193601:web:6d1098a6b077937d7dd7c0",
  measurementId: "G-Z0MPR3R36W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };