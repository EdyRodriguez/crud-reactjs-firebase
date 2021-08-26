// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEEl5yFiRy1b0wyJtyLwZ_4nkGZhZmk9c",
  authDomain: "crud-firebase-er.firebaseapp.com",
  databaseURL: "https://crud-firebase-er-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-er",
  storageBucket: "crud-firebase-er.appspot.com",
  messagingSenderId: "622619770377",
  appId: "1:622619770377:web:4df4079bb26c1880a842d8"
};

// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();