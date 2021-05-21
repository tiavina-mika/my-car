import { Joi } from 'express-validation';

/**
 * 
 * validate the request body for PUT and POST
 * @param {...object} otherValues 
 * @returns 
 */
const validateBody = (otherValues) => {
  return {
    body: Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().required().min(4),
      ...otherValues,
    }),
  }
};


// POST /api/cars
const signup = validateBody({
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export default {
  signup,
};

