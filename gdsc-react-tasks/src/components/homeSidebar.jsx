import "./homeSidebar.css"

export default function HomeSidebar() {
  return (
    <aside>
      <div className="sidebarContainer">
        <img src="/Tasks Logo.png" alt="Tasks Logo" id="logo" />
        <div id="aboutUser">
          Signed in with
          <p id="currentUserEmail"></p>
        </div>
        <button type="button" className="sideButton" id="newTask">
          New Task
        </button>
        <button type="button" className="sideButton" id="logout">
          Logout
        </button>
      </div>
    </aside>
  );
}