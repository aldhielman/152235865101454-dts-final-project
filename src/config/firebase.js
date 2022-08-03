import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzMSDrGvSe0WL5ZvbRQhTBQZhyZ8OPHBI",
  authDomain: "cvd19-tracker.firebaseapp.com",
  databaseURL: "https://cvd19-tracker.firebaseio.com",
  projectId: "cvd19-tracker",
  storageBucket: "cvd19-tracker.appspot.com",
  messagingSenderId: "845936832704",
  appId: "1:845936832704:web:121629ce1d49d302143d25",
  measurementId: "G-D7KWQEX9N6",
};

// Initialize Firebase

initializeApp(firebaseConfig);

export const auth = getAuth();
