import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "cvd19-tracker.firebaseapp.com",
  databaseURL: "https://cvd19-tracker.firebaseio.com",
  projectId: "cvd19-tracker",
  storageBucket: "cvd19-tracker.appspot.com",
  messagingSenderId: "845936832704",
  appId: "1:845936832704:web:121629ce1d49d302143d25",
  measurementId: "G-D7KWQEX9N6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createReview = (message, rating, username, photoUrl) => {
  const reviewsColRef = collection(db, "reviews");

  return addDoc(reviewsColRef, {
    message,
    rating,
    username,
    photoUrl,
    createdAt: serverTimestamp(),
  });
};

export const getReviews = () => {
  const reviewsColRef = collection(db, "reviews");
  return getDocs(reviewsColRef);
};

export const auth = getAuth();
