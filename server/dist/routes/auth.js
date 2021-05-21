"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidation = require("express-validation");

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _auth2 = _interopRequireDefault(require("../validations/auth"));

// import userController from '../controllers/user'
// import { authLocal, authJwt } from '../config/passport'
var router = _express["default"].Router();

router.route('/login').post((0, _expressValidation.validate)(_auth2["default"].login), _auth["default"].login);
router.route('/signup').post((0, _expressValidation.validate)(_auth2["default"].signup), _auth["default"].signup);
router.route('/logout').get(_auth["default"].isAuth, _auth["default"].logout); // router.route('/auth/change-password/:userId')
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

var _default = router;
exports["default"] = _default;