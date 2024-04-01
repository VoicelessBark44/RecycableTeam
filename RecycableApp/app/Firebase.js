import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyDRE2oajmcRvS4naYBYgFLcdSxnzKP4OBc",
  
    authDomain: "recyclablemedicalapp-bb8d7.firebaseapp.com",
  
    projectId: "recyclablemedicalapp-bb8d7",
  
    storageBucket: "recyclablemedicalapp-bb8d7.appspot.com",
  
    messagingSenderId: "93384404440",
  
    appId: "1:93384404440:web:33dcb48294adc5e75056ad",
  
    measurementId: "G-X873JHX9G3"
  
  };

const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);
export {db };
export default firebase;