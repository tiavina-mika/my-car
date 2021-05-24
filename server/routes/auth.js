import express from 'express';

import authController from '../controllers/auth';
import authValidations from '../validations/auth';
import { validate } from '../validations/validate';

const router = express.Router()

router.route('/login')
  .post(validate(authValidations.login), authController.login);

router.route('/signup')
  .post(validate(authValidations.signup), authController.signup);

router.route('/logout')
  .get(authController.isAuth, authController.logout)

router.route('/profile')
  .put(authController.isAuth, validate(authValidations.editProfile), authController.editProfile);

export default router
