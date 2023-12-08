import Logos from "../components/Logos";
import { CreateTask } from "../components/CreateTask";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Tasks = () => {
  // Text
  const text = {
    heading: "Tasks Page",
    intro: "Tasks Here",
    loremIpsum:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  };

  const { tasks, deleteAllTasks, fetchTasks, handleEdit, deleteTaskById } =
    taskStore();

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const navigate = useNavigate();
  const storeHandleLogout = userStore((state) => state.handleLogout);
  // Function to handle the click event of the logout button
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here
    alert("Log out succesfull");
    navigate("/"); // You can change this to the login route
  };

  return (
    <>
      <nav>
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="app-li">
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      <Logos />
      <div>
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>
        <CreateTask />
        <button onClick={deleteAllTasks}>Delete All Tasks</button>
        {tasks.length === 0 ? (
          <>
            <p>No tasks yet...</p>
          </>
        ) : (
          tasks.map((task, index) => (
            <div
              className={`card-container ${
                task.done ? "green-border" : "red-border"
              }`}
              key={index}
              onClick={() => handleEdit(task._id)}
            >
              <p>{task.task}</p>
              <p>{task.done ? "Task is Completed" : "Not Completed"}</p>
              <button onClick={() => deleteTaskById(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};