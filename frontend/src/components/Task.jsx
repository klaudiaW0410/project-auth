// Task.js
import { useState } from 'react';
import { Input } from './Input';
import Lottie from "lottie-react";
import animationToDo from "../assets/animationToDo.json";
import './Task.css';

export const Task = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <div className="task-container">
        <div className="task-header">
          <h5 className="task-title">Hello ...</h5>
          <Lottie animationData={animationToDo} />;
        </div>
        <div className="task-wrapper">
          <h5>Your tasks for today:</h5>
          {tasks.map((task, index) => (
            <div key={index} className="task-details">
              <p className="task-name">{task}</p>
              <p className="task-time">13:00</p>
            </div>
          ))}
        </div>
        <Input onAddTask={handleAddTask} />
      </div>
    </>
  );
};
