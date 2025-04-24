// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBZ7uJjNgpyPi7DIE4vV0xbofIBsETwQg",
  authDomain: "guauly.firebaseapp.com",
  projectId: "guauly",
  storageBucket: "guauly.appspot.com",
  messagingSenderId: "18494752750",
  appId: "1:18494752750:web:5acdf1263c704d85d6d27f"
};

console.log("CONFIG:", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
