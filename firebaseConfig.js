import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // ✅ solo getAuth
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCBZ7uJjNgpyPi7DIE4vV0xbofIBsETwQg',
  authDomain: 'guauly.firebaseapp.com',
  projectId: 'guauly',
  storageBucket: 'guauly.appspot.com',
  messagingSenderId: '18494752750',
  appId: '1:18494752750:web:5acdf1263c704d85d6d27f',
};

// Inicialización de Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicialización normal para Expo
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
