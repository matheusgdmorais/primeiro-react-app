import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ny2NhAimSPVWj5Euoj_r1u8_cQIn3sM",
  authDomain : "my-project-a6d28.firebaseapp.com" , 
  projectId : "my-project-a6d28" , 
  storageBucket : "my-project-a6d28.firebasestorage.app" , 
  messagingSenderId: "605291092567",
  appId: "1:605291092567:web:84ea313c43793f8b6be112",
  measurementId: "G-1JT3R8SH6Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);