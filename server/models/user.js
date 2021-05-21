import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { formatReturnedJSON } from '../config/db';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

/**
 * hash the password before save
 */
UserSchema.pre('save', async function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10); // 10 rounds
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (error) {
    console.error('error: ', error);
    return next(error);
  }
});

/**
 * compare the input password and the saved crypted password
 * @param {string} toCompare 
 * @returns 
 */
UserSchema.methods.comparePassword = async function(toCompare) {
  try {
    const user = this;

    const isMatch = await bcrypt.compare(toCompare, user.password);
    return isMatch;
  } catch (error) {
    console.error('error: ', error);
  }
};

// return id instead of _id
formatReturnedJSON(UserSchema);

const User = mongoose.model('User', UserSchema);

export default User;