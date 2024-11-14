import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export default app;