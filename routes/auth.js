import express from 'express';
import { validate } from 'express-validation';

import authController from '../controllers/auth';
import authValidations from '../validations/auth';
// import userController from '../controllers/user'
// import { authLocal, authJwt } from '../config/passport'

const router = express.Router()

// router.route('/login')
//   .post(authLocal, authController.signin)
router.route('/signup')
  .post(validate(authValidations.signup), authController.signup)
// router.route('/auth/signout')
//   .get(authController.signout)
// router.route('/auth/change-password/:userId')
//   .put(authJwt, authController.changePassword)
// router.route('/auth/new-password/:userId')
//   .put(authController.newPassword)
// router.route('/auth/forgotten-password')
//   .post(authController.forgottenPassword)
// router.route('/api/confirm/:id')
//   .get(authController.confirm)
// router.route('/api/count')
//   .get(authController.countAll)

// router.param('userId', userController.userByID)

export default router
