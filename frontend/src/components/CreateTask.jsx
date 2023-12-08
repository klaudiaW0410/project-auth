import { useState } from "react";
import { taskStore } from "../stores/taskStore";

export const CreateTask = () => {
  const [task, setTask] = useState("");
  const { addTaskToServer } = taskStore();

  const taskInput = (e) => {
    setTask(e.target.value);
  };

  const addTaskLocal = async () => {
    if (task.trim() !== "") {
      await addTaskToServer(task);
      setTask(""); // Clear the input field after the task is added
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="enter task"
        onChange={taskInput}
        value={task}
      />
      <button onClick={addTaskLocal}>Add Task</button>
    </>
  );
};