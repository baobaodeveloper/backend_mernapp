import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/postRoute.js';
import authRoute from './routes/authRoute.js';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

// Route
app.use('/posts', postRoute);
app.use('/auth', authRoute);
app.get('/', (req, res) => res.send('App running'));

mongoose
  .connect(process.env.DATABASE)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Connect success ${process.env.PORT}...`)
    )
  )
  .catch(() => console.log('Connect fail...'));
