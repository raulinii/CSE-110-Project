// firebase.ts
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Path to the service account key JSON file
const serviceAccountPath = path.resolve(__dirname, "./config/firebaseConfig.json");

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw new Error("Firebase Admin configuration is invalid.");
  }
}

const db = admin.firestore();

export { db };
