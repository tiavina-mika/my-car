import express from 'express';
import { validate } from 'express-validation';

import carController from '../controllers/car';
import carValidation from '../validations/car';

const router = express.Router();

router.param('carId', carController.carById);

router.route('/cars')
  .get(carController.findAll)
  .post(validate(carValidation.create), carController.create);

router.route('/cars/:carId')
  .get(carController.findOne)
  .put(validate(carValidation.edit), carController.edit)
  .delete(carController.remove);

export default router;