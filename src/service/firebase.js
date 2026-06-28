// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCsbfszPvcOOR5TyBBdvw3xBU768UwGqk",
  authDomain: "betapos-795ff.firebaseapp.com",
  projectId: "betapos-795ff",
  storageBucket: "betapos-795ff.firebasestorage.app",
  messagingSenderId: "603445725851",
  appId: "1:603445725851:web:d038e532065e4bd1cc943e",
  measurementId: "G-RC2EC1JY1N",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const analytics = getAnalytics(app);

export default app;
