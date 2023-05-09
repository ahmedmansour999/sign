import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDysdepFFlp9TiWQyC9gjN9ZHGak-PsOlA",
  authDomain: "fir-f3a0f.firebaseapp.com",
  databaseURL: "https://fir-f3a0f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-f3a0f",
  storageBucket: "fir-f3a0f.appspot.com",
  messagingSenderId: "153159878206",
  appId: "1:153159878206:web:d0820cb6f4ec4fabd3336f",
  measurementId: "G-GD85DEXKFX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
