import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaSf8bOh4944qefOnfy3cTzfm5vnCpS7Q",
  authDomain: "gb-lesson-9-ee720.firebaseapp.com",
  projectId: "gb-lesson-9-ee720",
  storageBucket: "gb-lesson-9-ee720.appspot.com",
  messagingSenderId: "37242499465",
  appId: "1:37242499465:web:c0f77fc1032d338ebcb158",
  measurementId: "G-Z5SMZMB34F",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database().ref();
export const auth = firebase.auth();
