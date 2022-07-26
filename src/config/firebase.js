import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, facebookProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithGithub = () => {
  signInWithPopup(auth, githubProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      console.log(err);
    });
};
