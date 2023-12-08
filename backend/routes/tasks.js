import express from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();
// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post task
router.post('/add', async (req, res) => {
  const { task } = req.body;

  try {
    const accessToken = req.header('Authorization');

    // Check if the user exists based on the access token
    const user = await User.findOne({ accessToken: accessToken });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Create a new task with the assigned user
    const newTask = new Task({
      task: task,
      user: user._id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Could not save task to the database', error: err.message });
  }
});

//update the task
router.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task } = req.body;

    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    existingTask.task = task;
    const updatedTask = await existingTask.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// delete task
router.delete('/delete/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;
