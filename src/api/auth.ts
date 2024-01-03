import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider);

export const logout = async () => await auth.signOut();
