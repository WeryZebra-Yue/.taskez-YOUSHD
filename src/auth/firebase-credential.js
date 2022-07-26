// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhsu2XK_eGVzGi1Qlos9g_8iXyUY5T-64",
  authDomain: "taskez-youshd.firebaseapp.com",
  projectId: "taskez-youshd",
  storageBucket: "taskez-youshd.appspot.com",
  messagingSenderId: "459682934729",
  appId: "1:459682934729:web:931b90d46600d03ab8c218",
  measurementId: "G-TPDFT41XWN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
