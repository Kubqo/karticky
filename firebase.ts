// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP9JnQN647WAge0RJ1xPM0-7HvsOSUJK4",
  authDomain: "karticky-1d942.firebaseapp.com",
  projectId: "karticky-1d942",
  storageBucket: "karticky-1d942.appspot.com",
  messagingSenderId: "805757689700",
  appId: "1:805757689700:web:572bc286bbfa5719606471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firebase Auth provider
export const provider = new GoogleAuthProvider();

export const database = getFirestore(app);

export default app;
