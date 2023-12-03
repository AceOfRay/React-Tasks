import { useState } from "react";
import "./App.css";
import TasksHome from "./pages/home";
import LoginPage from "./pages/loginForm";
import { auth } from "./firebaseappInit";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {

  // set up login state logic
  const [user, setUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    console.log('User Successfully Logged In')
  });


  

  return <main>
    {user ? <TasksHome user={user}></TasksHome> : <LoginPage setUser={setUser}></LoginPage>}
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

