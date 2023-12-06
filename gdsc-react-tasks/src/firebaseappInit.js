import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA0b1orZuVglV9GTH8sFnJzBlQwKKUDafM",
    authDomain: "tasks-c9287.firebaseapp.com",
    projectId: "tasks-c9287",
    storageBucket: "tasks-c9287.appspot.com",
    messagingSenderId: "49788873624",
    appId: "1:49788873624:web:7cd48239c2a39c93f359ed",
    measurementId: "G-00J4T5G2EE"
};
  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export {app, auth, db}