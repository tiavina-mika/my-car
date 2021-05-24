import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { ValidationError } from 'express-validation';
const mongoSanitize = require('express-mongo-sanitize');

import connectDB from './config/db';
import carRouter from './routes/car';
import authRouter from './routes/auth';
import commentRouter from './routes/comment';
import { getApiCustomError } from './utils/utils';

dotenv.config();

const app = express();

// connect and run database
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// To remove data, use:
app.use(mongoSanitize());

app.use(express.static('dist/public'));

app.use('/test', (req, res) => {
  res.send('Hello Word');
});
app.use('/api', carRouter);
app.use('/api', commentRouter);
app.use('/users', authRouter);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/public/index.html');
});

// ---------------------------- //
// ---------- Errors ---------- //
// ---------------------------- //
// params and body validation middleware
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // custom error
    const errorResponse = getApiCustomError(err);
    res
      .status(err.statusCode)
      .json(errorResponse);
  } else {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log('server running at port ' + PORT);
});