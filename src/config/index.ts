
import * as path from 'path';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

BigInt.prototype['toJSON'] = function() { return this.toString()  }

export const vars = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '3000'),

  postgres: {
    host: process.env.PG_HOST,
    port: +(process.env.PG_PORT || 5432),
    db: process.env.PG_DB,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASS,
  },
};