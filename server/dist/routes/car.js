"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidation = require("express-validation");

var _car = _interopRequireDefault(require("../controllers/car"));

var _car2 = _interopRequireDefault(require("../validations/car"));

var router = _express["default"].Router();

router.param('carId', _car["default"].carById);
router.route('/cars').get(_car["default"].findAll).post((0, _expressValidation.validate)(_car2["default"].create), _car["default"].create);
router.route('/cars/:carId').get(_car["default"].findOne).put((0, _expressValidation.validate)(_car2["default"].edit), _car["default"].edit)["delete"](_car["default"].remove);
var _default = router;
exports["default"] = _default;