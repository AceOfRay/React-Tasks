import React, { useState, useEffect } from "react";
import TaskComponent from "./task";
import "./taskContainer.css";
import { db } from "../firebaseappInit";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

class Task {
  constructor(uid, key, taskName, taskDate, taskDescription, status) {
    this.uid = uid;
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
    const q = query(collectionRef, orderBy("taskDate"));

    const unsubscribe = onSnapshot(q, (qSnap) => {
      try {
        const taskList = qSnap.docs.map((doc) => {
          const data = doc.data();
          return new Task(
            user.uid,
            doc.id,
            data.taskName,
            data.taskDate,
            data.taskDescription,
            data.taskStatus
          );
        });
        setTasks(taskList);
      } catch (error) {
        console.error("Error processing snapshot:", error);
      }
    });

    // Cleanup function
    return () => unsubscribe();
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
