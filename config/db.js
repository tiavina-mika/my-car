import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * return id instead of _id
 */
export const formatReturnedJSON = (schema) => {
  schema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
}

export default connectDB;