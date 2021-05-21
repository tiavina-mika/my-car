import express from 'express';
import { validate } from 'express-validation';

import carController from '../controllers/car';
import carValidation from '../validations/car';

// import { authJwt } from '../config/passport'

const router = express.Router()

router.param('carId', carController.carById);

router.route('/cars')
  .get(carController.findAll)
  .post(validate(carValidation.create), carController.create);
  // .post(validate(carValidation.create), carController.create);
  // .post(authJwt, upload.single('photo'), carController.create);

// router.route('/cars/photo/:carId')
//   .get(carController.photo)
// router.route('/cars/filter/:slug')
//   .get(carController.findOneBySlug)
router.route('/cars/:carId')
  .get(carController.findOne)
  .put(validate(carValidation.edit), carController.edit)
//   .put(authJwt, upload.single('photo'), carController.edit)
//   .delete(authJwt, carController.remove)
  .delete(carController.remove)


export default router;