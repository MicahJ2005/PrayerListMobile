import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig  = {
    apiKey: "AIzaSyAJ2R_7MfExmdZRq4DrExlyNZkCv9pKJ7A",
    authDomain: "devo4me.firebaseapp.com",
    projectId: "devo4me",
    storageBucket: "devo4me.appspot.com",
    messagingSenderId: "1052504611022",
    appId: "1:1052504611022:web:268875f9b8b667e683989f",
    measurementId: "G-YM3JBXD5DR"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;