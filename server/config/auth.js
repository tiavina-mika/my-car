import jwt from 'express-jwt';
// import jwt from 'jsonwebtoken';

const authenticate = jwt({
  // secret: 'sec'
  secret: process.env.JWT_SECRET
});

export const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET);


export default authenticate;