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
 * 
 * validate the request body for PUT and POST
 * @param {...object} otherValues 
 * @returns 
 */
var validateBody = function validateBody(otherValues) {
  return {
    body: _expressValidation.Joi.object(_objectSpread({
      email: _expressValidation.Joi.string().email({
        minDomainSegments: 2
      }),
      password: _expressValidation.Joi.string().required().min(6).max(100)
    }, otherValues))
  };
}; // POST /users/signup


var signup = validateBody({
  name: _expressValidation.Joi.string().valid(),
  confirmPassword: _expressValidation.Joi.string().valid(_expressValidation.Joi.ref('password')).required()
}); // POST /users/login

var login = validateBody(); // PUT /users/profile

var editProfile = {
  body: _expressValidation.Joi.object({
    email: _expressValidation.Joi.string().email({
      minDomainSegments: 2
    }),
    name: _expressValidation.Joi.string().required().max(100)
  })
};
var _default = {
  signup: signup,
  login: login,
  editProfile: editProfile
};
exports["default"] = _default;