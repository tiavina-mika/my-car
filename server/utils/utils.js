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