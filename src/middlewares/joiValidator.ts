
import * as joi from 'joi';
import { errorManager } from "../config/errorManager";
import CustomError from '../utils/customError';


/**
 * Middleware. 
 * Validates the given schema using Joi, getting values from the specified property from req object
 * 
 * @param schema the Joi schema to be used for validation
 * @param property the property of the request object to validate if it matches the schema. DEFAULT VALUE = "body"
 * 
 * @returns 
 */
const joiValidator = (schema: joi.ObjectSchema<any>) => {
  return (req, res, next) => {
    try {
        const { error } = schema.validate(req, {abortEarly: true});
        const valid = error == null;
        if (valid) {
            next();
        } else {
            console.log(error);
            const { details } = error;
            const message = details.map(i => i.message.replace(/"/g, "'")).join(',');
    
            throw new CustomError({...errorManager.VALIDATION_ERROR, message});
        }  
    }
    catch(error)
    {
        return next(error);
    }

  }
}

export default joiValidator;
