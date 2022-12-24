import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../constants/common.js';
import Posts from '../models/posts.js';
import {
  paginationFeature,
  searchFeature,
  sortFeature,
} from '../utils/features.js';

export const getAllPost = async (req, res) => {
  try {
    const { title, tags, page, limit } = req.query;

    const count = await Posts.countDocuments();
    const pagination = {
      _limit: +limit || LIMIT_DEFAULT,
      _page: +page || PAGE_DEFAULT,
      _totalRow: count,
    };

    let response = searchFeature(title, tags);
    response = sortFeature(response);
    let data = await paginationFeature(response, page, limit);
    res.status(200).json({ posts: data, pagination });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostById = async (req, res) => {
  try {
    const response = await Posts.findById({ _id: req.params.id });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  if (req.file?.filename) {
    req.body.photo = req.file.filename;
  }

  try {
    const response = await Posts.create({
      ...req.body,
      tags: req.body?.tags.split(','),
      creator: req.user._id.toString(),
      createdAt: new Date().toISOString(),
      name: req.user.username,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const updatePost = async (req, res) => {
  if (req.file?.filename) {
    req.body.photo = req.file.filename;
  }

  try {
    const postUpdate = await Posts.findById(req.params.id);
    if (postUpdate) {
      const response = await Posts.findByIdAndUpdate(
        req.params.id,
        { ...req.body, tags: req.body?.tags.split(',') },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postDelete = await Posts.findById(req.params.id);
    if (postDelete) {
      const response = await Posts.findByIdAndDelete(req.params.id);
      res.status(204).json(response);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateLike = async (req, res) => {
  try {
    let postUpdate = await Posts.findById({ _id: req.body._id });
    if (postUpdate) {
      const userAlreadyLike = postUpdate.like.findIndex(
        (userId) => userId === req.user._id.toString()
      );

      if (+userAlreadyLike !== -1) {
        postUpdate.like.splice(userAlreadyLike, 1);
      } else {
        postUpdate.like.push(req.user._id);
      }

      const response = await Posts.findByIdAndUpdate(
        req.body._id,
        postUpdate,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateMessage = async (req, res) => {
  try {
    let postUpdate = await Posts.findById({ _id: req.params.id });
    postUpdate.comments.push(req.body.message);

    const response = await Posts.findByIdAndUpdate(
      req.params.id,
      postUpdate,
      {
        new: true,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
