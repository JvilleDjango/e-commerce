import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDNhzsNW-2PwvqaZmh8lCc-E5XSjkeWvBo",
  authDomain: "ecommerce-react-project-9d016.firebaseapp.com",
  databaseURL: "https://ecommerce-react-project-9d016.firebaseio.com",
  projectId: "ecommerce-react-project-9d016",
  storageBucket: "ecommerce-react-project-9d016.appspot.com",
  messagingSenderId: "645207364299",
  appId: "1:645207364299:web:bea770ec0a2d6d7974c14e",
  measurementId: "G-DLE84ERGX5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
