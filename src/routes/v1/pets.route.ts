/* eslint-disable max-len */
import * as express from 'express';
import expressValidation from 'express-validation';
import {PetController} from '../../controllers/pet.controller'
import joiValidator from '../../middlewares/joiValidator';
import { petsValidationSchemas } from '../../validations/pets.validation';

const { validate } = expressValidation;

const router = express.Router();

router.route('/:petId/bids')
    .post(joiValidator(petsValidationSchemas.addBid), PetController.addBid)
    .get(joiValidator(petsValidationSchemas.listBids), PetController.listBids);

router.route('/:petId/bids/winners').get(PetController.listWinners);


export {router as petRouter};
