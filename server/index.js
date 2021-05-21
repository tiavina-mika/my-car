import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ValidationError } from 'express-validation';
const mongoSanitize = require('express-mongo-sanitize');

import connectDB from './config/db';
import carRouter from './routes/car';
import authRouter from './routes/auth';
import commentRouter from './routes/comment';

dotenv.config();

const app = express();

// connect and run database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// To remove data, use:
app.use(mongoSanitize());

app.use('/api', carRouter);
app.use('/api', commentRouter);
app.use('/users', authRouter);

// valiadion
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(500)
      .json(err);
  }
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log('server running at port ' + PORT);
});