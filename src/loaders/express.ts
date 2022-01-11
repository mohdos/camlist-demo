
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import morgan from '../utils/morgan';
import ErrorHandler from '../middlewares/errorHandler';

import { router } from '../routes';
import { connectToDB } from '../database/connection';
import { setupSwagger } from './swagger';

/**
 * Express instance
 * @public
 */
const app = express();

connectToDB();

// log all requests
app.use(morgan);


// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// parse body params and attache them to req.body
app.use(express.json({ limit: '100mb' }));
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000,
  }),
);

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

setupSwagger(app);

// mount api routes
app.use('/api', router);

// if error is not an instanceOf CustomError, convert it.
app.use(ErrorHandler.handle);

// catch 404 and forward to error handler
app.use(ErrorHandler.notFound);


export default app;
