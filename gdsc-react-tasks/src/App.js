import { useState, useEffect } from "react";
import "./App.css";
import TasksHome from "./pages/home";
import LoginPage from "./pages/loginForm";

export default function App() {
  // set up login state logic
  const [user, setUser] = useState(false);  


  return <main>
    {user ? <TasksHome setUser={setUser} user={user}></TasksHome> : <LoginPage setUser={setUser}></LoginPage>}
  </main>;
}

