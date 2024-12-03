import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign In successful.");
    return auth.currentUser;
  } catch (error) {
    console.log("An error occurred while registering user  : ", error);
    return;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully.");
    return auth.currentUser;
  } catch (error) {
    console.log("An error occurred while signing in  : ", error);
    return;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const doSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Sign out Successful.");
    return auth.currentUser;
  } catch (error) {
    console.log("An error occurred while signing out : ", error);
    return;
  }
};
