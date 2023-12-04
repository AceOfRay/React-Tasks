import { useState } from "react";
import "./homeSidebar.css";
import NewTaskModal from "./newTaskModal";

export default function HomeSidebar({ setUser, user }) {

  const logoutUser = () => {
    setUser(false);
  }

  const [modalDisplay, setModalDisplay] = useState(false)

  const openModal = () => [
    setModalDisplay(true)
  ]

  const closeModal = () => {
    setModalDisplay(false)
  }


  return (
    <aside>
      <div className="sidebarContainer">
        <img src="/Tasks Logo.png" alt="Tasks Logo" id="logo" />
        <div id="aboutUser">
          Signed in with
          <p id="currentUserEmail">{user.email}</p>
        </div>
        <button type="button" className="sideButton" id="newTask" onClick={openModal}>
          New Task
        </button>
        <button type="button" className="sideButton" id="logout" onClick={logoutUser}>
          Logout
        </button>
      </div>
      <NewTaskModal modalState={modalDisplay} closeModal={closeModal} user={user}/>
    </aside>
  );
}
