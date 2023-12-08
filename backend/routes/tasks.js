import express from 'express';
import Task from '../models/Task';
import User from '../models/User';


const router = express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
