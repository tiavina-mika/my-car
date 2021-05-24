"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendErrorResponse = exports.find = exports.isAdmin = exports.getApiCustomError = void 0;

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
/**
 * check if the user is an admin
 * @param {*} user 
 * @returns 
 */


exports.getApiCustomError = getApiCustomError;

var isAdmin = function isAdmin(user) {
  return user.roles.includes('ADMINISTRATOR');
};
/**
 * find an array by its id
 * @param {*} array 
 * @param {*} id 
 * @returns 
 */


exports.isAdmin = isAdmin;

var find = function find(array, id) {
  return array.find(function (c) {
    return c.id === id;
  });
};
/**
 * 
 * @param {*} response 
 * @param {*} message 
 * @returns 
 */


exports.find = find;

var sendErrorResponse = function sendErrorResponse(response, message) {
  var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
  return response.status(statusCode).json({
    error: true,
    message: message
  });
};

exports.sendErrorResponse = sendErrorResponse;