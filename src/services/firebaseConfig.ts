import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6FewcLDASFFghGcBolytpeI0h9zS7U4M",
  authDomain: "visacon-47d6b.firebaseapp.com",
  projectId: "visacon-47d6b",
  storageBucket: "visacon-47d6b.firebasestorage.app",
  messagingSenderId: "356492541738",
  appId: "1:356492541738:web:bb0e82b6cabf4850b12853"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
