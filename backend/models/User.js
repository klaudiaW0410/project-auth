import mongoose from 'mongoose';
import crypto from 'crypto';

import { Schema } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', userSchema);

export default User;
