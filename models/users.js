import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: [6, 'Username must be at least 6 characters'],
    required: [true, 'Please enter your username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Email is not valid'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
});

const Users = mongoose.model('Users', userSchema);
export default Users;
