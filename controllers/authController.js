import Users from '../models/users.js';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/token.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const existUser = await Users.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: 'Email already exist' });
    if (password !== confirmPassword)
      return res.status(400).json('confirm password is not match');
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      username,
      email,
      password: hashPassword,
    });

    const token = createToken(user);
    const { password: passwords, ...others } = user._doc;
    res.status(201).json({ user: others, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await Users.findOne({ email });
    if (!existUser)
      res.status(404).json({ message: 'User is not exist' });
    const comparePassWord = await bcrypt.compare(
      password,
      existUser.password
    );
    if (!comparePassWord) res.status(400).json('Invalid credentials');

    const token = createToken(existUser);
    const { password: passwords, ...others } = existUser._doc;
    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
