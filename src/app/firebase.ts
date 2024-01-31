import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvFiaC9P0QKr-Yni5ckOsRQjOj1ujqaAg",
  authDomain: "fusionapi-72587.firebaseapp.com",
  projectId: "fusionapi-72587",
  storageBucket: "fusionapi-72587.appspot.com",
  messagingSenderId: "3237216458",
  appId: "1:3237216458:web:e7f897613ddeb209fb3433",
};
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
