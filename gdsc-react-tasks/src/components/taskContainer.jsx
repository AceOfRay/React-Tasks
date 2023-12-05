import React, { useState, useEffect } from "react";
import TaskComponent from "./task";
import "./taskContainer.css"
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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "Users", user.uid, "Tasks");
    const q = query(collectionRef);

    // Debounce the state update
    let debounceUpdate;
    const debouncedSetTasks = (taskList) => {
      clearTimeout(debounceUpdate);
      debounceUpdate = setTimeout(() => {
        setTasks(taskList);
      }, 300); // Adjust the debounce timeout as needed
    };

    const unsubscribe = onSnapshot(q, (qSnap) => {
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

        // Update the state with debouncing
        debouncedSetTasks(taskList);
      } catch (error) {
        console.error('Error processing snapshot:', error);
      }
    });

    return () => {
      clearTimeout(debounceUpdate);
      unsubscribe();
    };
  }, [user.uid]);

  return (
    <div id="mainBodyContainer">
      <div id="headerRow">
        <p id="completion">Completed</p>
        <p id="name">Task Name</p>
        <p id="date">Due Date</p>
        <p id="description">Description</p>
        <div id="options">Delete</div>
      </div>
      <div id="taskContainer">
        {tasks.map((task) => (
          <TaskComponent key={task.key} taskObject={task} />
        ))}
      </div>
    </div>
  );
}
