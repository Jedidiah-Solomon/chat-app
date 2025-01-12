import admin from "firebase-admin";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

// Simulating __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // Correct path to the service account key
const serviceAccountPath = path.resolve(
  __dirname,
  "..",
  "config",
  "serviceAccountKey.json"
);

// Read and parse the service account key JSON
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK for the backend (server-side)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Real-time DB URL
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Storage URL
});

// Define Firebase Admin services
const adminFirestore = admin.firestore();
const adminAuth = admin.auth();
const adminStorage = admin.storage();

// Export all Firebase Admin services
export { adminFirestore, adminAuth, adminStorage };
