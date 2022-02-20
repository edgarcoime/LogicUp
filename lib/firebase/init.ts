import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBykf-3WJgAyK-MLlR3D45l2CLdiQP7nBQ",
  authDomain: "logicup-eed4a.firebaseapp.com",
  projectId: "logicup-eed4a",
  storageBucket: "logicup-eed4a.appspot.com",
  messagingSenderId: "595422898690",
  appId: "1:595422898690:web:5c560f90b8bb6f6f35d51b"
};

// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);
export const auth = getAuth(app)