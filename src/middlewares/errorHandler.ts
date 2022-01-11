// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import * as expressValidation from 'express-validation';
import CustomResponse from '../utils/response';
// import logger from '../utils/logger';
import CustomError from '../utils/customError';
import { errorManager } from '../config/errorManager';

const { VALIDATION_ERROR } = errorManager;


export default class ErrorHandler {
  static notFound(req: any, res: any) {
    const errorName = 'API_NOT_FOUND';
    const response = new CustomResponse(res);
    return response.error({ ...errorManager.NOT_FOUND });
  }


  static handle(
    err: any,
    req?: express.Request,
    res?: express.Response,
    // eslint-disable-next-line no-unused-vars
    next?: express.NextFunction,
  ): any {
    if (res)
    {
        const response = new CustomResponse(res);
        if (err instanceof CustomError) {
          return response.error({code: err.code, message: err.message, responseCode: err.responseCode}).send();
        }
        return response.error({
            message: err.type,
            code: 500
        }).send({error: err});
    }
    else
    {
        const resp = express.response;
        return resp.status(500).send({
            err
        });
    }
    
  }
}
