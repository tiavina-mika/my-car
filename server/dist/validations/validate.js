"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _expressValidation = require("express-validation");

/**
 * 
 * @param {*} validation 
 * @param {boolean} isCustomMessage 
 * @returns 
 */
var validate = function validate(validation) {
  var isCustomMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (0, _expressValidation.validate)(validation, {
    keyByField: isCustomMessage
  });
};

exports.validate = validate;