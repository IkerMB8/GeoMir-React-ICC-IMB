// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmWOygQeV1iJksyFBHw-K0bDvsaaQABpU",
  authDomain: "geomir-react-imb-icc.firebaseapp.com",
  projectId: "geomir-react-imb-icc",
  storageBucket: "geomir-react-imb-icc.appspot.com",
  messagingSenderId: "335472113752",
  appId: "1:335472113752:web:b312a5d7016386aa50b22d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)