import Navbar from "../components/navbar";
import HomeSidebar from "../components/homeSidebar";
import TaskContainer from "../components/taskContainer";

export default function TasksHome({ setUser, user }) {
  return (
    <div>
      <HomeSidebar setUser={setUser} user={user}></HomeSidebar>
      <Navbar></Navbar>
      <TaskContainer user={user}></TaskContainer>
    </div>
  );
}
