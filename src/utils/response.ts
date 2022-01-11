import * as express from 'express';
import { errorManager } from '../config/errorManager';

/**
 * @class
 * Custom response class to handle responses to client
 */
class CustomResponse {
  response: express.Response;
  responseCode: string;
  message: string;
  code: number = 200;
  otherResp: any;

  constructor(response: express.Response) {
    this.response = response;
  }

  error(options: {code?: number, message?: string, responseCode?: string} = {})
  {
    this.code = options.code || 500;
    this.responseCode = options.responseCode || errorManager.UNKNOWN_ERROR.responseCode;
    this.message = options.message || errorManager.UNKNOWN_ERROR.message;
    return this;
  }

  success(options: {code?: number, message?: string, responseCode?: string} = {})
  {
    this.code = options.code || 200;
    this.responseCode = options.responseCode || "SUCCESS";
    this.message = options.message || "success";
    return this;
  }

  send(data: any = {})
  {
    this.response.set('Access-Control-Allow-Origin', '*');
    this.response.status(this.code || 200).send({
      message: this.message || 'success',
      responseCode: this.responseCode || 'SUCCESS',
      code: this.code,
      ...data
    });
  }

  setSimpleResponse({ responseCode = "SUCCESS", message = "Success", code = 200 })
  {
      this.message = message;
      this.responseCode = responseCode;
      this.code = code;
      // this.makeResponse();
      this.send();
  }
}

export default CustomResponse;
