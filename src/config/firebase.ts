// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId:process.env.REACT_APP_MEASUREMENTID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const FDB = getDatabase(app); // Realtime Database
// export const storage = getStorage(app);

// export default app;



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAK_BZYO09M8AnrZ1vqPL3TEHwAi5LhenI",
  authDomain: "admin-pannel-dff9f.firebaseapp.com",
  databaseURL: "https://admin-pannel-dff9f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-pannel-dff9f",
  storageBucket: "admin-pannel-dff9f.firebasestorage.app",
  messagingSenderId: "368337536696",
  appId: "1:368337536696:web:66c5b32a36579be4da564d",
  measurementId: "G-GTJTG67DL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const FDB = getDatabase(app); // Realtime Database
export const storage = getStorage(app);

export default app;
