// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwep-kaHP9ru4lNRBwHe3dNscGLngpr-c",
  authDomain: "mui-dashboard-e623b.firebaseapp.com",
  projectId: "mui-dashboard-e623b",
  storageBucket: "mui-dashboard-e623b.appspot.com",
  messagingSenderId: "731467603524",
  appId: "1:731467603524:web:dcf196c0583872f1f82611",
  measurementId: "G-L65CBTVJGY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
