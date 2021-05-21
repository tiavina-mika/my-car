import express from 'express';

import carController from '../controllers/car';
import authController from '../controllers/auth';
import commentController from '../controllers/comment';

const router = express.Router();

router.param('carId', carController.carById);

router.route('/cars/:carId/comment')
  .post(authController.isAuth, commentController.create);

router.route('/cars/:carId/comment/:commentId')
  .put(authController.isAuth, commentController.edit);

router.route('/cars/:carId/comment/:commentId')
  .delete(authController.isAuth, commentController.remove);

export default router;