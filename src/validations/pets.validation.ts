import * as Joi from 'joi';

export const petsValidationSchemas =  {
  addBid: Joi.object().keys({
    body: Joi.object().keys({
      bid: Joi.number().required(),
    }),
    headers: Joi.object().keys({
      'user-id': Joi.number().required(),
    }).unknown(),
    params: Joi.object().keys({
      petId: Joi.number().required(),
    }),
  }).unknown(),
  listBids: Joi.object().keys({
    headers: Joi.object().keys({
      'user-id': Joi.number().required(),
    }).unknown(),
    params: Joi.object().keys({
      petId: Joi.number().required(),
    }),
    query: Joi.object().keys({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
    }),
  }).unknown(),
};
