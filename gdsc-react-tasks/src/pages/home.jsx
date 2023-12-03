import Navbar from "../components/navbar";
import HomeSidebar from "../components/homeSidebar";
import TaskContainer from "../components/taskContainer";

export default function TasksHome({ user }) {
  return (
    <div>
      <HomeSidebar email={user.email}></HomeSidebar>
      <Navbar></Navbar>
      <TaskContainer user={user}></TaskContainer>
    </div>
  );
}
