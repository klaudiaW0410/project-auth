// Input.js
import { useState } from 'react';
import './Input.css';

export const Input = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleAddTask = () => {
    onAddTask(task); // Pass the task to the parent component
    setTask('');
    setShowInput(false);
  };

  return (
    <div className="task-add">
      {showInput && (
        <>
          <div className='input-wrapper'>
            <input
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="add-button" onClick={handleAddTask}>Add</button>
          </div>
        </>
      )}
      <div className="button-task">
        <button onClick={handleButtonClick}>
          <img src="./add.svg" alt="Contact" />
        </button>
      </div>
    </div>
  );
};
