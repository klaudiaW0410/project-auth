// Input.js
import { useState } from 'react';
import { taskStore } from '../stores/taskStore';
import './Input.css';

export const Input = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const { addTaskToServer } = taskStore()

  const [showInput, setShowInput] = useState(false);

  const taskInput = event => setTask(event.target.value)

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      await addTaskToServer(task)
      setTask('');
      setShowInput(false);
      onAddTask(task); // Pass the task to the parent component
    }

  };

  return (
    <div className="task-add">
      {showInput && (
        <>
          <div className='input-wrapper'>
            <input
              className="input-input"
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={taskInput}
            />
            <button
              className="add-button"
              onClick={() => {
                console.log('Button clicked!');
                handleAddTask();
              }}
            >
              Add
            </button>
          </div>
        </>
      )}
      <div className="button-task">
        <button onClick={handleButtonClick}>
          <img className="button-image" src="./add.svg" alt="Add" />
        </button>
      </div>
    </div>
  );
};
