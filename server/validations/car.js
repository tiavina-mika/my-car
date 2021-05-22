import { Joi } from 'express-validation';

/**
 * validate the request body for PUT and POST
 * @param {...object} otherValues 
 * @returns 
 */
const validateBody = (otherValues) => {
  return {
    body: Joi.object({
      name: Joi.string().required(),
      shortDesc: Joi.string().required(),
      year: Joi.string().required(),
      distance: Joi.string().required(),
      fuel: Joi.string(),
      gearbox: Joi.string(),
      price: Joi.string().required(),
      image: Joi.string(),
      ...otherValues,
    }),
  }
};

/**
 * 
 * validate the request params for PUT, GET, DELETE
 * @param {...object} otherValues 
 * @returns 
 */
const validateParams = (otherValues) => {
  return {
    params: Joi.object({
      carId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      ...otherValues,
    })
  }
};

// POST /api/cars
const  create = validateBody();;

// GET /api/cars/:carId
const  carById = validateParams();

// PUT /api/cars/:carId
const edit = {
  ...validateBody(),
  ...validateParams(),
};

export default {
  create,
  carById,
  edit,
};

