import { errorManager } from "../config/errorManager";

/**
 * Custom error class to handle errors
 */
export default class CustomError extends Error {
    code: number
    responseCode : any
    message: string;
  
    constructor({
      message, responseCode = errorManager.UNKNOWN_ERROR.responseCode, code = 500,
    }) {
      super(message);
      this.responseCode = responseCode;
      this.message = message;
      this.code = code;
    }
  }
  