import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = (user) =>
  jwt.sign(
    { email: user.email, _id: user._id },
    `${process.env.JWT_SECRET}`,
    { expiresIn: `${process.env.EXPIRESIN}` }
  );
