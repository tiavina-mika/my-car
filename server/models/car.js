import mongoose from 'mongoose';

import { formatReturnedJSON } from '../config/db';

const Schema = mongoose.Schema;

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxLength: 50 },
    shortDesc: { type: String, required: true },
    year: { type: String, required: true, maxLength: 4 },
    distance: { type: String, required: true },
    fuel: { type: String, default: 'Essence', enum: ['Essence', 'Diesel', 'Electrique', 'Hybride', 'Solaire', 'Hydrogène'] },
    gearbox: { type: String, default: 'Manuelle', enum: ['Manuelle', 'Automatique'] },
    price: { type: String, required: true },
    image: { type: String },
    comments: [{
      text: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
      postedBy: { type: Schema.ObjectId, ref: 'User' }
    }],
  },
  { timestamps: true }
);

// return id instead of _id
formatReturnedJSON(CarSchema);

const Car = mongoose.model('Car', CarSchema);

export default Car;