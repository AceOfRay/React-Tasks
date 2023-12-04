import "./taskContainer.css";
import { useState } from "react";
import TaskComponent from "./task";
import { db } from "../firebaseappInit";
import { collection, query, onSnapshot } from "firebase/firestore";

class Task {
  constructor(key, taskName, taskDate, taskDescription, status) {
    this.key = key;
    this.taskName = taskName;
    this.taskDate = taskDate;
    this.taskDescription = taskDescription;
    this.status = status;
  }
}

export default function TaskContainer({ user }) {
  const [taskComponentArray, setTaskComponentArray] = useState([]);

  const collectionRef = collection(db, "Users", user.uid, "Tasks");
  const q = query(collectionRef);

  onSnapshot(q, (qSnap) => {
    try {
      const taskList = [];
      qSnap.forEach((doc) => {
        const data = doc.data();
        taskList.push(
          new Task(
            doc.id,
            data.taskName,
            data.taskDate,
            data.taskDescription,
            data.taskStatus
          )
        );
      });
      console.log(taskList);
  
      let taskArray = [];
      taskList.forEach((task) => {
        taskArray.push(
          <TaskComponent taskObject={task}></TaskComponent>
        );
      });
  
      setTaskComponentArray(taskArray);
    } catch (error) {
      console.error('Error processing snapshot:', error);
    }
  });
  

  return (
    <div id="mainBodyContainer">
      <div id="headerRow">
        <p id="completion">Completed</p>
        <p id="name">Task Name</p>
        <p id="date">Due Date</p>
        <p id="description">Description</p>
        <div id="options">Delete</div>
      </div>
      <div id="taskContainer">{taskComponentArray}</div>
    </div>
  );
}
