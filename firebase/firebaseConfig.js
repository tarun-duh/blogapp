import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA98N_WneRRzGf_0eQHmjsCK6UqwvvqsPY",
  authDomain: "blogyou-e6389.firebaseapp.com",
  projectId: "blogyou-e6389",
  storageBucket: "blogyou-e6389.appspot.com",
  messagingSenderId: "872019819191",
  appId: "1:872019819191:web:1a1dd86e2c06ba9b1bab32",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
console.log(auth);
export { app, database, auth };
