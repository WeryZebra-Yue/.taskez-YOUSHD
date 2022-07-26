import firbase from "../auth/firebase-credential.js";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// export
export const LogIn = (email, password) => {
  const database = getDatabase();
  const auth = getAuth();

  // onValue(
  //   onValue(ref(database, "users"), (snapshot) => {
  //     const users = snapshot.val();
  //     console.log(users);
  //     const user = users.find((user) => user.email === email);
  //     if (user) {
  //       auth
  //         .signInWithEmailAndPassword(email, password)
  //         .then((userCredential) => {
  //           const user = userCredential.user;
  //           return [true, user];
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           // ..
  //           return [false, errorMessage];
  //         });
  //     } else {
  //       return [false, "User not found"];
  //     }
  //   })
  // );
  // login with email and password
  signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
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
