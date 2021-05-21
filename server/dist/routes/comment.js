"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _car = _interopRequireDefault(require("../controllers/car"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _comment = _interopRequireDefault(require("../controllers/comment"));

var router = _express["default"].Router();

router.param('carId', _car["default"].carById);
router.route('/cars/:carId/comment').post(_auth["default"].isAuth, _comment["default"].create);
router.route('/cars/:carId/comment/:commentId').put(_auth["default"].isAuth, _comment["default"].edit);
router.route('/cars/:carId/comment/:commentId')["delete"](_auth["default"].isAuth, _comment["default"].remove);
var _default = router;
exports["default"] = _default;