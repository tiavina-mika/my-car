import mongoose from 'mongoose';
import { formatReturnedJSON } from '../config/db';

const carSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// return id instead of _id
formatReturnedJSON(carSchema);

const Car = mongoose.model('Car', carSchema);

export default Car;