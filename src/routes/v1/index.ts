import express from 'express';
import { petRouter } from './pets.route';

const router = express.Router();

router.use('/pets', petRouter);

export {router as v1Router};
