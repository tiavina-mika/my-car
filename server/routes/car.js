import express from 'express';
import carController from '../controllers/car';
// import { authJwt } from '../config/passport'

const router = express.Router()

router.param('carId', carController.carById);

router.route('/api/cars')
  .get(carController.findAll)
  .post(carController.create);
  // .post(authJwt, upload.single('photo'), carController.create);

// router.route('/api/cars/photo/:carId')
//   .get(carController.photo)
// router.route('/api/cars/filter/:slug')
//   .get(carController.findOneBySlug)
router.route('/api/cars/:carId')
  .get(carController.findOne)
  .put(carController.edit)
//   .put(authJwt, upload.single('photo'), carController.edit)
//   .delete(authJwt, carController.remove)
  .delete(carController.remove)


export default router;