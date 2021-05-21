import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ValidationError } from 'express-validation';

import connectDB from './config/db';
import carRouter from './routes/car';

dotenv.config();

const app = express();

// connect and run database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', carRouter);

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