import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBhIZaEAJZe-q7R3wNkuzNeEIZQeNnRtI4",
  authDomain: "nanny-709dc.firebaseapp.com",
  databaseURL:
    "https://nanny-709dc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-709dc",
  storageBucket: "nanny-709dc.firebasestorage.app",
  messagingSenderId: "221473095034",
  appId: "1:221473095034:web:65c72fe726aee1955d6ac3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
