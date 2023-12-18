import { useState } from "react";
import "./newTaskModal.css";
import { db } from "../firebaseappInit";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }
  return randomId;
}

export default function NewTaskModal({ modalState, closeModal, user }) {
  // making state for newTask Inputs
  const [taskName, setTaskName] = useState("");

  const [taskDate, setTaskDate] = useState("");

  const [taskDescription, setTaskDescription] = useState("");

  const createNewTask = async () => {
    const taskData = {
      taskName: taskName,
      taskDescription: taskDescription,
      taskDate: Timestamp.fromDate(new Date(taskDate)),
      taskStatus: false,
    };
    const ID = generateRandomId();
    await setDoc(doc(db, "Users", user.uid, "Tasks", ID), taskData);
    console.log("New Task Successfully Created");
    closeModal();
  };

  if (!modalState) {
    return null;
  } else {
    return (
      <div id="newTaskModal" className="modal">
        <div className="modal-content">
          <span className="close" id="closeModal" onClick={closeModal}>
            &times;
          </span>
          <form id="taskForm">
            <input
              placeholder="Task Name"
              type="text"
              id="taskName"
              name="taskName"
              required
              onChange={(change) => setTaskName(change.target.value)}
            />
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              onChange={(change) => setTaskDate(change.target.value)}
            />
            <input
              placeholder="Description"
              type="text"
              id="newTaskDescrip"
              name="description"
              onChange={(change) => setTaskDescription(change.target.value)}
            />
            <button id="addTaskSubmit" type="button" onClick={createNewTask}>
              Add Task
            </button>
          </form>
        </div>
      </div>
    );
  }
}
