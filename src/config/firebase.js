import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA7hqlyddU1Cqf6nNc2V05mWBCdteTxtU",
  authDomain: "gadgetarium-ae42f.firebaseapp.com",
  projectId: "gadgetarium-ae42f",
  storageBucket: "gadgetarium-ae42f.firebasestorage.app",
  messagingSenderId: "986014357820",
  appId: "1:986014357820:web:f0e4f8b94a68f05b9f2639",
  measurementId: "G-5K3L5YMZB9",
};

const app = initializeApp(firebaseConfig, "gadgetarium");

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
