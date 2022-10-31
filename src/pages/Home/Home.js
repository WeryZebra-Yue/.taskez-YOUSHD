import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../auth/firebase-credential.js";
function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // check if user is logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/projects");
        document.getElementById("loader").style.display = "none";
      } else {
        navigate("/auth");
        document.getElementById("loader").style.display = "none";
      }
    });
  });

  return (
    <div>
      <header>
        <h1>Homepage</h1>
      </header>
    </div>
  );
}

export default Home;
