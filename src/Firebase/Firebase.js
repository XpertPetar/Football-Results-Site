// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1qbN3HOqRZqIe1uh0HbTHzBGneAJb2Pk",
    authDomain: "football-results-site.firebaseapp.com",
    databaseURL: "https://football-results-site-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "football-results-site",
    storageBucket: "football-results-site.appspot.com",
    messagingSenderId: "132357635114",
    appId: "1:132357635114:web:0fd2383d7f4a3f777c1753",
    measurementId: "G-50CDZN34XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
