import mongoose from "mongoose";

const { Schema } = mongoose; 
const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
    minlength: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.model('Task', taskSchema); 

export default Task;
