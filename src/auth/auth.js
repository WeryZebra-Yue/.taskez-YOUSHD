import firbase from "../auth/firebase-credential.js";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// export
export const LogIn = (email, password) => {
  const database = getDatabase();
  const auth = getAuth();

  // login with email and password
  signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return [true, user];
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage, errorCode);
      return [false, errorMessage];
    });
};
