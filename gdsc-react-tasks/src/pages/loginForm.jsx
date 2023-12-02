import "./loginForm.css";

export default function LoginPage() {
  return (
    <main>
      <h1 className="title">Welcome to Tasks</h1>
      <div id="container">
        <form action="" id="loginForm">
          <input type="text" id="emailInput" placeholder="Email" />
          <input type="password" id="passwordInput" placeholder="Password" />
          <button type="button" id="loginButton">
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
