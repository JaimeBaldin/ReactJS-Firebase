import firebase from 'firebase/compat/app';
import'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyATnDooM-FQ2gOjzWb3VRB356z8XCCRYLA",
    authDomain: "curso-eedf1.firebaseapp.com",
    projectId: "curso-eedf1",
    storageBucket: "curso-eedf1.appspot.com",
    messagingSenderId: "391112091979",
    appId: "1:391112091979:web:16e31b43426f423b67e0ce",
    measurementId: "G-KKVBXQ0QGW"
  };
  
  // Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;  