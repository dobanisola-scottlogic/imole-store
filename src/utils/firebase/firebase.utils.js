import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getDoc, doc, setDoc, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSpaa4bvKDQL8-Mu4F7N65UbSgVU6qCW0",
  authDomain: "imole-udemy-db.firebaseapp.com",
  projectId: "imole-udemy-db",
  storageBucket: "imole-udemy-db.appspot.com",
  messagingSenderId: "156806944780",
  appId: "1:156806944780:web:75e0673d85612a0309b629",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleAuthProvider);

const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userDocRef;
};
