import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { formatReturnedJSON } from '../config/db';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false },
  password: { type: String, required: true },
  token: { type: String },
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
    console.error('pre save error: ', error);
    return next(error);
  }
});


/**
 * 
 * generate token when loggin
 * @returns {string}
 */
UserSchema.methods.generateToken = async function() {
  try {
    const user = this;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    return token;
  } catch (error) {
    console.error('generateToken error: ', error);
  }
}


/**
 * compare the input password and the saved crypted password
 * @param {string} toCompare 
 * @returns {boolean}
 */
UserSchema.methods.comparePassword = async function(toCompare) {
  try {
    const user = this;

    const isMatch = await bcrypt.compare(toCompare, user.password);
    return isMatch;
  } catch (error) {
    console.error('findByToken error: ', error);
  }
};


/**
 * validating token for auth routes middleware
 * @returns {Object}
 */
UserSchema.static('findByToken', async function(token) {
    try {
      const user = this;
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!decode) {
        throw new Error('Invalid token');
      }
  
      const newUser = await user.findOne({ "_id": decode.id, token });
      
      return newUser;
    } catch (error) {
      console.error('findByToken error: ', error);
    }
})

// return id instead of _id
formatReturnedJSON(UserSchema);

const User = mongoose.model('User', UserSchema);

export default User;