// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF7gWs8zzRYtxSKJp0Ar_f6-xeGCw6Frw",
  authDomain: "portfolio-dashboard-c2761.firebaseapp.com",
  projectId: "portfolio-dashboard-c2761",
  storageBucket: "portfolio-dashboard-c2761.appspot.com",
  messagingSenderId: "294426353251",
  appId: "1:294426353251:web:d7b0ef93e0ed0a1059a256"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);