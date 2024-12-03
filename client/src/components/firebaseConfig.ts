import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0m3BGx6DKaOUFHWBI_wZ2WDOmvpTer44",
  authDomain: "mindfulu-110.firebaseapp.com",
  projectId: "mindfulu-110",
  storageBucket: "mindfulu-110.firebasestorage.app",
  messagingSenderId: "882268193601",
  appId: "1:882268193601:web:6d1098a6b077937d7dd7c0",
  measurementId: "G-Z0MPR3R36W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
