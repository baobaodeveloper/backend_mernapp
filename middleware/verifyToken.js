import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

export const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers?.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      const token = req.headers?.authorization.split(' ')[1];
      if (!token)
        res.status(401).json({
          message: 'You are not logged in!Please login to get access',
        });

      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      const currentUser = await Users.findOne({ _id: decode._id });
      if (!currentUser)
        res.status(401).json({
          message:
            'The user belonging to this token does no longer exist.',
        });

      req.user = currentUser;
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
