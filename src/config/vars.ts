
import * as path from 'path';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
  sample: path.join(__dirname, '../../.env.example'),
});


export const vars = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '3000'),

  firebase: {
      credsFilePath: process.env.FIREBASE_CREDS_JSON_FILE || ""
  }
};