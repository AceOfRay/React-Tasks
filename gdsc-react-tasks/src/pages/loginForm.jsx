import { useState } from "react";
import "./loginForm.css";
import { auth } from "../firebaseappInit";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [pswd, setPassword] = useState('');

  const handleSignIn = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, pswd);
      setUser(auth.currentUser);
    } catch (error) {
      console.log("Error Signing In:", error.message)
    }
  };

  return (
    <main>
      <h1 className="title">Welcome to Tasks</h1>
      <div id="container">
        <form action="" id="loginForm">
          <input type="text" id="emailInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" id="passwordInput" placeholder="Password" value={pswd} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" id="loginButton" onClick={handleSignIn}>
            Login
          </button>
        </form>
        <button type="button" id="googleLogin">
          Sign In With
          <img id="googleLogo" src="googleLogo.png" alt="Google Icon" />
        </button>
      </div>
    </main>
  );
}
