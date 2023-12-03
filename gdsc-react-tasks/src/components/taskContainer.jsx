import "./taskContainer.css"
import { useState } from "react";
import { ref, query, orderByChild, onChildAdded, update, remove } from "firebase/datbase";
import { db } from "../firebaseappInit";

class Task {
    constructor(uid, key, taskName, taskDate, taskDescription, status) {
      (this.uid = uid),
        (this.key = key),
        (this.taskName = taskName),
        (this.taskDate = taskDate),
        (this.taskDescription = taskDescription),
        (this.status = status);
    }
  }

export default function TaskContainer( { user }) {

    const [taskList, setTaskList] = useState([])

    const tasksRef = ref(db, "users/" + user.uid + "/tasks");

    onChildAdded(query(tasksRef, orderByChild("date")), (childSnapshot) => {
        const taskData = childSnapshot.val();
        const key = childSnapshot.key;
  
        //make a new task object
        const newTask = new Task(
          uid,
          key,
          taskData.taskName,
          taskData.date,
          taskData.description,
          taskData.completed
        );
  
        renderTaskElement(newTask);
      });
    


  return (
    <body id="mainBodyContainer">
      <div id="headerRow">
        <p id="completion">Completed</p>
        <p id="name">Task Name</p>
        <p id="date">Due Date</p>
        <p id="description">Description</p>
        <div id="options">Delete</div>
      </div>
      <div id="taskContainer"></div>
    </body>
  );
}
