import mongoose from 'mongoose';

const postShema = new mongoose.Schema({
  creator: {
    type: String,
    required: [true, 'Post must have a creator'],
  },
  name: {
    type: String,
    required: [true, 'Please enter your username'],
  },
  comments: {
    type: [String],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Post must have a creator'],
  },
  message: {
    type: String,
    required: [true, 'Post must have a message'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Post must have a tags'],
  },
  like: {
    type: [String],
    default: [],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Posts = mongoose.model('Posts', postShema);

export default Posts;
