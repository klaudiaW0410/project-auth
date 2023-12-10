// Task.js
// import Lottie from "lottie-react";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { taskStore } from '../stores/taskStore';
import { userStore } from '../stores/userStore';
import { Input } from '../components/Input';

// import animationToDo from "../assets/animationToDo.json";

import './Task.css';


export const Task = () => {

  const [tasksUse, setTasksUse] = useState([]);

  const { tasks, deleteAllTasks, fetchTasks, handleEdit, deleteTaskById } = taskStore()

  useEffect(() => {
    fetchTasks()
  }, [tasks])

  const navigate = useNavigate()

  const storeHandleLogout = userStore(state => state.handleLogout)

  const onLogoutClick = () => {
    storeHandleLogout()
    alert('Logout successful')
    navigate('/')
  }

  const handleAddTask = (newTask) => {
    setTasksUse([...tasksUse, newTask]);
  };

  return (
    <>
      <div className="app-container">
        <div className="task-container">
          <div className="task-header">
            <h5 className="task-title">Hello ...</h5>
            {/* <Lottie animationData={animationToDo} />; */}
          </div>
          <div className="task-wrapper">
            {tasks.length === 0 ? (
              <>
                <h5>No tasks yet...</h5>
              </>
            ) : (
              tasks.map((task, index) => (
                <div
                  className={`task-details ${task.done ? "green-border" : "red-border"}`}
                  key={index}
                  onClick={() => handleEdit(task._id)}
                >
                  <p className="task-name">
                    {task.task}
                  </p>
                  {/* <p>
                    {task.done ? "Task is completed" : "Not completed"}
                  </p> */}

                  <button className=" delete-button"
                    onClick={() => deleteTaskById(task._id)}>
                    <img src="./delete.svg" alt="Delete" />
                  </button>
                </div>
              ))
            )}
          </div>
          <Input onAddTask={handleAddTask} />
          <div className="button-wrapper">
            <button className="task-button" onClick={deleteAllTasks}>Delete all tasks</button>
            <button className="task-button" onClick={onLogoutClick}>Sign out</button>
          </div>
        </div>
      </div>
    </>
  );
};
