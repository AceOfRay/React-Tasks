import { useState } from "react";
import "./loginForm.css";
import { auth } from "../firebaseappInit";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function LoginPage({ setUser }) {
  // state to handle the input of email and password
  const [email, setEmail] = useState("");
  const [pswd, setPassword] = useState("");
  const [name, setName] = useState("");

  // a function that gets called when either the login or sign in w/ google buttons get clicked

  const handleSignIn = async (loginMethod) => {
    if (loginMethod === "email") {
      try {
        await signInWithEmailAndPassword(auth, email, pswd);
        setUser(auth.currentUser);
      } catch (error) {
        alert("Could Not Log In: Invalid Login Credentials");
      }
    } else if (loginMethod === "google") {
      try {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            setUser(auth.currentUser);
          })
          .catch((error) => {});
      } catch (error) {
        console.log("Error");
      }
    }
  };

  const [signUpState, setSignUpState] = useState(false);

  const handleNewUserSignIn = () => {
    try {
      if (name && email && pswd) {
        createUserWithEmailAndPassword(auth, email, pswd)
          .then((credential) => {
            updateProfile(auth.currentUser, {
              displayName: name,
            });
            setUser(auth.currentUser);
          })
          .catch((error) => {
            console.log("Error Setting Display Name:", error);
          });
      } else {
        const err = new Error("Ensure All Fields Are Filled Out");
        alert(err);
        throw err;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <nav className="LoginNav">
        <img src="Tasks Logo.png" alt="Tasks Logo" className="titleImage" />
        <h1 className="title">Welcome to Tasks</h1>
      </nav>

      <div id="container">
        <form action="" id="loginForm">
          <input
            type="text"
            id="nameInput"
            placeholder="Display Name"
            value={name}
            style={{ display: signUpState ? "flex" : "none" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            id="emailInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="passwordInput"
            placeholder="Password"
            value={pswd}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            id="loginButton"
            onClick={() => {
              handleSignIn("email");
            }}
            style={{ display: signUpState ? "none" : "flex" }}
          >
            Login
          </button>
          <button
            type="button"
            id="signupButton"
            style={{ display: signUpState ? "flex" : "none" }}
            onClick={handleNewUserSignIn}
          >
            Sign Up
          </button>
        </form>
        <button
          type="button"
          id="googleLogin"
          onClick={() => {
            handleSignIn("google");
          }}
        >
          Sign In With
          <img id="googleLogo" src="googleLogo.png" alt="Google Icon" />
        </button>
      </div>

      <footer
        className="foot"
        onClick={() => {
          setSignUpState(!signUpState);
        }}
        style={{ display: signUpState ? "none" : "flex" }}
      >
        Don't Have an Account? Click Me To Sign Up
      </footer>
      <footer
        className="foot"
        onClick={() => {
          setSignUpState(!signUpState);
        }}
        style={{ display: signUpState ? "flex" : "none" }}
      >
        Have an Account? Click Me To Login
      </footer>
    </main>
  );
}
