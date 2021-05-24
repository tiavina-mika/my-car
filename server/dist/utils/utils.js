"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiCustomError = void 0;

/**
 * 
 * @param {*} err 
 * @returns {Object}
 */
var getApiCustomError = function getApiCustomError(err) {
  var errorResponse = {
    error: true,
    message: Object.values(err.details[0])[0]
  };
  return errorResponse;
};

exports.getApiCustomError = getApiCustomError;