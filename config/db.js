import mongoose from 'mongoose';

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

export default connectDB;