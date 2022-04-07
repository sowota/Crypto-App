// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRWSgrOtygPggLIYVafMo9_dgSamGnafQ",
  authDomain: "crypto-app-4d7ec.firebaseapp.com",
  projectId: "crypto-app-4d7ec",
  storageBucket: "crypto-app-4d7ec.appspot.com",
  messagingSenderId: "791611684282",
  appId: "1:791611684282:web:cf2ae089f3e8806f53d983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db }