import "./task.css";

export default function TaskComponent({ taskObject }) {
  const taskDate = taskObject.taskDate.toDate();
  const stringDate = `${(taskDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${taskDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${taskDate.getFullYear()}`;
  return (
    <div key={taskObject.key} className="Task">
      <div className="completion">
        <input
          type="checkbox"
          checked={taskObject.status}
        ></input>
      </div>

      <p className="name">{taskObject.taskName}</p>
      <p className="date">{stringDate}</p>
      <p className="description">{taskObject.taskDescription}</p>
      <div className="options">
        <img src="trashIcon.png" alt="Trash" className="trashIcon" />
      </div>
    </div>
  );
}
