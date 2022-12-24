import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../constants/common.js';
import Posts from '../models/posts.js';

export const searchFeature = (title, tags) => {
  let response;
  if (title && tags) {
    const regex = new RegExp(title, 'i');
    response = Posts.find({
      title: regex,
      tags: { $in: tags },
    });
  } else if (title) {
    const regex = new RegExp(title, 'i');
    response = Posts.find({
      title: regex,
    });
  } else if (tags) {
    response = Posts.find({
      tags: { $in: tags.split(',') },
    });
  } else {
    response = Posts.find();
  }

  return response;
};

export const sortFeature = (response) => {
  try {
    return response.sort('-createdAt');
  } catch (error) {
    console.log(error);
  }
};

export const paginationFeature = async (response, page, limit) => {
  try {
    const pageCurrent = +page || PAGE_DEFAULT;
    const limitCurrent = +limit || LIMIT_DEFAULT;
    const skip = (pageCurrent - 1) * limitCurrent;
    return response.skip(skip).limit(limitCurrent);
  } catch (error) {
    console.log(error);
  }
};
