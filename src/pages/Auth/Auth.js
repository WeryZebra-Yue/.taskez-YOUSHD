// React Imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../auth/firebase-credential.js";

// Assets
import SvgLayer from "../../assets/svg/layer.svg";
import errorSvg from "../../assets/svg/error.svg";
// CSS Imports
import "./Auth.css";
import { LogIn, SignIn } from "../../auth/auth.js";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { createBrowserHistory } from "history";
import EyeChecker from "../../assets/svg/EyeChecker";
function Auth() {
  const history = createBrowserHistory({ forceRefresh: true });
  const [signin, setSignin] = React.useState(false);
  const Login_Email = React.useRef(null);
  const InputWrapperLoginEmail = React.useRef(null);
  const Signin_Email = React.useRef(null);
  const Signin_Password = React.useRef(null);
  const Name = React.useRef(null);
  const Login_Password = React.useRef(null);
  const [LoginError, setLoginError] = React.useState(false);
  const [LoginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [SigninError, setSigninError] = React.useState(false);
  const [SigninErrorMessage, setSigninErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [Eye, setEye] = React.useState(false);
  // Sign in with email and password
  const LogIn = (email, password) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/projects");
        return [true, user];
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(true);
        if (errorCode === "auth/user-not-found") {
          setLoginError(true);
          setLoginErrorMessage("User not found!");
        } else if (errorCode === "auth/wrong-password") {
          setLoginError(true);
          setLoginErrorMessage("Wrong password!");
        } else if (errorCode === "auth/invalid-email") {
          setLoginError(true);
          setLoginErrorMessage("Invalid email!");
        }

        console.log(errorMessage, errorCode);
        return [false, errorMessage];
      });
  };
  const SignIn = (name, email, password) => {
    const database = getDatabase();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        });
        navigate("/projects");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setSigninError(true);
          setSigninErrorMessage("Email already in use!");
        } else if (errorCode === "auth/invalid-email") {
          setSigninError(true);
          setSigninErrorMessage("Invalid email!");
        } else if (errorCode === "auth/weak-password") {
          setSigninError(true);
          setSigninErrorMessage("Weak password!");
        }
        console.log(errorMessage, errorCode);
      });
  };

  useEffect(() => {
    if (getAuth()) {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          navigate("/projects");
        } else {
          document.getElementById("loader").style.display = "none";
        }
      });
    }
  });

  return (
    <div className="MainWrapper">
      <div className="Wrapper">
        <div className="SvgWrapper">
          <img src={SvgLayer} alt="Layer" />
        </div>
        <div className="AuthWrapper">
          <div className="SelectionWrapper">
            <div
              className={`Login ${!signin ? "Selected" : ""} `}
              style={{
                color: "#1A3B58",
                opacity: signin ? "33%" : "100%",
              }}
              onClick={() => setSignin(false)}
            >
              Log In
            </div>
            <div
              className={`Signup ${signin ? "Selected" : ""} `}
              style={{
                color: "#1A3B58",
                opacity: !signin ? "33%" : "100%",
              }}
              onClick={() => setSignin(true)}
            >
              Sign Up
            </div>
          </div>
          <div className="SecondHalf">
            <div className="AuthContainer">
              {signin ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SignIn(
                      Name.current.value,
                      Signin_Email.current.value,
                      Signin_Password.current.value
                    );
                  }}
                >
                  <div>
                    <div>
                      <div className="InputWrapper fullname" required>
                        <input placeholder="Full Name" ref={Name} />
                      </div>
                      <div className="InputWrapper">
                        <input
                          placeholder="Email"
                          type={"email"}
                          required
                          ref={Signin_Email}
                        />
                      </div>
                      <div className="InputWrapper">
                        <input
                          placeholder="Password"
                          type={!Eye ? `password` : `text`}
                          ref={Signin_Password}
                          required
                        />
                        <div onClick={() => setEye(!Eye)}>
                          <EyeChecker color={Eye ? `black` : "#9A9A9A"} />
                        </div>
                        {/* <img
                          style={{
                            cursor: "pointer",
                            color: Eye ? "black" : "#9B9B9B",
                          }}
                          src={EyeSvg}
                          onClick={() => {
                            setEye(!Eye);
                          }}
                        /> */}
                      </div>
                    </div>
                    {SigninError && (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <img src={errorSvg} />
                        <div
                          style={{
                            color: "#ff0000",
                            fontSize: "12px",
                            marginLeft: "10px",
                          }}
                        >
                          {SigninErrorMessage}
                        </div>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="SubmitButton"
                      style={{
                        backgroundColor: "#fffff",
                        // outline: "none",
                        border: "none",
                        width: "100%",
                      }}
                    >
                      <div onClick={SignIn}>Sign Up</div>
                    </button>

                    <div className="RememberMeCheckBox">
                      <input type={"checkbox"} />
                      <div className="RememberMe">Remember Me</div>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      LogIn(
                        Login_Email.current.value,
                        Login_Password.current.value
                      );
                    }}
                  >
                    <div>
                      <div>
                        <div className="InstructionWrapper">
                          <span
                            style={{
                              color: "#1A3B58",
                              fontWeight: 500,
                              fontSize: "21px",
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                            To Continue
                          </span>
                          <span
                            style={{
                              color: "#999999",
                              fontSize: "10px",
                            }}
                          >
                            We need your Name & Email
                          </span>
                        </div>
                        {/* <br /> */}
                      </div>

                      <div
                        className="InputWrapper"
                        ref={InputWrapperLoginEmail}
                      >
                        <input
                          placeholder="Email"
                          className="Email"
                          ref={Login_Email}
                          onInput={(e) => {
                            if (e.target.validity.valid) {
                              InputWrapperLoginEmail.current.style.border =
                                "2px solid green";
                            } else {
                              InputWrapperLoginEmail.current.style.border =
                                "2px solid #ff0000";
                            }
                          }}
                          required
                          type={"email"}
                        />
                      </div>
                      <div className="InputWrapper">
                        <input
                          placeholder="Password"
                          type={!Eye ? `password` : `text`}
                          ref={Login_Password}
                        />
                        <div onClick={() => setEye(!Eye)}>
                          <EyeChecker color={Eye ? `black` : "#9A9A9A"} />
                        </div>
                        {/* <img
                          style={{
                            cursor: "pointer",
                            color: Eye ? "black" : "white",
                          }}
                          onClick={() => {
                            setEye(!Eye);
                          }}
                          src={EyeSvg}
                        />  */}
                      </div>
                    </div>
                    {LoginError && (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <img src={errorSvg} />
                        <div
                          style={{
                            color: "#ff0000",
                            fontSize: "12px",
                            marginLeft: "10px",
                          }}
                        >
                          {LoginErrorMessage}
                        </div>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="SubmitButton"
                      style={{
                        backgroundColor: "#fffff",
                        // outline: "none",
                        border: "none",
                        width: "100%",
                      }}
                    >
                      <div>Log In</div>
                    </button>
                  </form>
                  <div className="RememberMeCheckBox">
                    <input type={"checkbox"} />
                    <div className="RememberMe">Remember Me</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
