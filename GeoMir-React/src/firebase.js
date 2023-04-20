/**
* Engega la Firebase i configura la bdd Firestore.
* @module firebase
* @function
* @returns {Object} La bdd Firestore.
*/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Firebase configuration object with API key and project details
const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>"
};

// Initializes Firebase app with the configuration object
const app = initializeApp(firebaseConfig);

/**
* Associa la bdd Firestore amb l'app Firebase.
* @function
* @returns {Object} La bdd Firestore.
*/
export const db = getFirestore(app);