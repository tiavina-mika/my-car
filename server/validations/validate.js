import { validate as validateError } from "express-validation";

/**
 * 
 * @param {*} validation 
 * @param {boolean} isCustomMessage 
 * @returns 
 */
export const validate = (validation, isCustomMessage = true) => validateError(validation, { keyByField: isCustomMessage });