"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _auth2 = _interopRequireDefault(require("../validations/auth"));

var _validate = require("../validations/validate");

var router = _express["default"].Router();

router.route('/login').post((0, _validate.validate)(_auth2["default"].login), _auth["default"].login);
router.route('/signup').post((0, _validate.validate)(_auth2["default"].signup), _auth["default"].signup);
router.route('/logout').get(_auth["default"].isAuth, _auth["default"].logout);
router.route('/profile').put(_auth["default"].isAuth, (0, _validate.validate)(_auth2["default"].editProfile), _auth["default"].editProfile);
var _default = router;
exports["default"] = _default;