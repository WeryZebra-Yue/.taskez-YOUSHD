import firbase from "../auth/firebase-credential.js";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// export
export const LogIn = async (email, password) => {
  const database = getDatabase();
  const auth = getAuth();

  try {
    // login with email and password
    const userCredential = await signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    return [true, user];
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
    return [false, errorMessage];
  }
};
