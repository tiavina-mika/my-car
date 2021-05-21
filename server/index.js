import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connectDB from './config/db';
import carRouter from './routes/car';

dotenv.config();

const app = express();

// connect and run database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', carRouter);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'I am using babel in NodeJS',
//     status: 'success',
//   });
// });

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log('server running at port ' + PORT);
});