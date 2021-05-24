"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _expressValidation = require("express-validation");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * validate the request body for PUT and POST
 * @param {...object} otherValues 
 * @returns 
 */
var validateBody = function validateBody(otherValues) {
  return {
    body: _expressValidation.Joi.object(_objectSpread({
      name: _expressValidation.Joi.string().max(50).required(),
      shortDesc: _expressValidation.Joi.string().required(),
      year: _expressValidation.Joi.string().required().max(4),
      distance: _expressValidation.Joi.string().required(),
      fuel: _expressValidation.Joi.string(),
      gearbox: _expressValidation.Joi.string(),
      price: _expressValidation.Joi.string().required(),
      image: _expressValidation.Joi.string()
    }, otherValues))
  };
};
/**
 * 
 * validate the request params for PUT, GET, DELETE
 * @param {...object} otherValues 
 * @returns 
 */


var validateParams = function validateParams(otherValues) {
  return {
    params: _expressValidation.Joi.object(_objectSpread({
      carId: _expressValidation.Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }, otherValues))
  };
}; // POST /api/cars


var create = validateBody();
; // GET /api/cars/:carId

var carById = validateParams(); // PUT /api/cars/:carId

var edit = _objectSpread(_objectSpread({}, validateBody()), validateParams());

var _default = {
  create: create,
  carById: carById,
  edit: edit
};
exports["default"] = _default;