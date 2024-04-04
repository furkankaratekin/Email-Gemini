// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "email-gemini.firebaseapp.com",
  projectId: "email-gemini",
  storageBucket: "email-gemini.appspot.com",
  messagingSenderId: "22703716788",
  appId: "1:22703716788:web:75dd8d96d57f481fa2dae1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
