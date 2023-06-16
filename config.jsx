// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi-1obwxoSrVs4k9eCjQ-MURThJYdquKs",
  authDomain: "todoapp-d2ae7.firebaseapp.com",
  projectId: "todoapp-d2ae7",
  storageBucket: "todoapp-d2ae7.appspot.com",
  messagingSenderId: "1072582131324",
  appId: "1:1072582131324:web:cab29f5b80b93916e393f9",
  measurementId: "G-3D45GXXKV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
 
