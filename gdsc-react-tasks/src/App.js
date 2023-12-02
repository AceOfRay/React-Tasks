import { useState, useEffect } from "react";
import "./App.css";
import TasksHome from "./pages/home";
import LoginPage from "./pages/loginForm";
import { auth } from "./firebaseappInit";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {

  // set up login state
  const [user, setUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const loginNormal = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    
  }

  


  return <main>
    {user ? <TasksHome></TasksHome> : <LoginPage></LoginPage>}
  </main>;
}
/*
  const count = 1;
  if (count % 2 > 0) {
    return <TasksHome></TasksHome>
  } else if (count === 10)
    return <LoginPage></LoginPage>
  else 
    return <SignUpPage></SignUpPage>
}
*/

