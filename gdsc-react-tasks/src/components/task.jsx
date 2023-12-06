import "./task.css";
import { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseappInit";

export default function TaskComponent({ taskObject }) {
  // this just takes in a task object and creates a component for it
  const taskDate = taskObject.taskDate.toDate();
  const stringDate = `${(taskDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${taskDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${taskDate.getFullYear()}`;

  const [status, setStatus] = useState(taskObject.status);

  const handleClick = (e) => {
    setStatus(e.target.checked);
  };

  //on change of a button, update field in db

  useEffect(() => {
    const document = doc(db, "Users", taskObject.uid, "Tasks", taskObject.key);
    updateDoc(document, {
      taskStatus: status,
    });
    console.log("Task:", taskObject.key, "Has Been Changed To:", status);
  }, [status]);

  //on the click of the delete button, delete the task

  const deleteTask = () => {
    const document = doc(db, "Users", taskObject.uid, "Tasks", taskObject.key);
    deleteDoc(document);
    console.log("Task Successfully Deleted");
  };

  return (
    <div key={taskObject.key} className="Task">
      <div className="completion">
        <input type="checkbox" checked={status} onChange={handleClick}></input>
      </div>

      <p className="name">{taskObject.taskName}</p>
      <p className="date">{stringDate}</p>
      <p className="description">{taskObject.taskDescription}</p>
      <div
        className="options"
        onClick={() => {
          deleteTask();
        }}
      >
        <img src="trashIcon.png" alt="Trash" className="trashIcon" />
      </div>
    </div>
  );
}
