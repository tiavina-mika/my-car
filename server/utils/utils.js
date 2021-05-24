/**
 * 
 * @param {*} err 
 * @returns {Object}
 */
export const getApiCustomError = (err) => {
  const errorResponse = { 
    error: true, 
    message: Object.values(err.details[0])[0] 
  };

  return errorResponse;
}

/**
 * check if the user is an admin
 * @param {*} user 
 * @returns 
 */
export const isAdmin = (user) => user.roles.includes('ADMINISTRATOR');

/**
 * find an array by its id
 * @param {*} array 
 * @param {*} id 
 * @returns 
 */
export const find = (array, id) => array.find(c => c.id === id);

/**
 * 
 * @param {*} response 
 * @param {*} message 
 * @returns 
 */
export const sendErrorResponse = (response, message, statusCode = 400) => {
  return response.status(statusCode).json({
    error: true,
    message,
  });
}
