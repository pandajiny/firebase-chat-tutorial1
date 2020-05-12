import { firebaseAuth } from "./../services/firebase";

export function signup(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new firebaseAuth.GoogleAuthProvider();
  return firebaseAuth().signInWithPopup(provider);
}

export function doSignout() {
  return firebaseAuth().signOut();
}
