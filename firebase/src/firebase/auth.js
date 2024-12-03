import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user;
  } catch (error) {
    console.log("error : ", error);
    return;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user;
  } catch (error) {
    console.log("error : ", error);
    return;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //   result.user; // store user in Fire Store
  return result;
};

export const doSignOut = async () => {
  try {
    const data = await auth.signOut();
    return data;
  } catch (error) {
    console.log("error : ", error);
    return;
  }
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = (email) => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}`,
  });
};
