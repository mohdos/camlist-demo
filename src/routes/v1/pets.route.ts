/* eslint-disable max-len */
import * as express from 'express';
import {PetController} from '../../controllers'
import {joiValidator} from '../../middlewares';
import { petsValidationSchemas } from '../../validations';


const router = express.Router();

router.route('/:petId/bids')
    .post(joiValidator(petsValidationSchemas.addBid), PetController.addBid)
    .get(joiValidator(petsValidationSchemas.listBids), PetController.listBids);

router.route('/:petId/bids/winners').get(joiValidator(petsValidationSchemas.listWinners), PetController.listWinners);


export {router as petRouter};
