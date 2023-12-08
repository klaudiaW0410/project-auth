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
    const accessToken = req.header("Authorization");

    
    const user = await User.findOne({ accessToken: accessToken });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

  
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


export default router;
