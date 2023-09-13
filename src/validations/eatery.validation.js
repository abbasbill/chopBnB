const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createEatery = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    contact: Joi.number().integer().required(),
    thumbnail: Joi.string().required(),
  }),
};

const getEateries = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEatery = {
  params: Joi.object().keys({
    eateryId: Joi.string().custom(objectId),
  }),
};

const updateEatery = {
  params: Joi.object().keys({
    eateryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      thumbnail: Joi.string().required(),
    })
    .min(1),
};

const deleteEatery = {
  params: Joi.object().keys({
    eateryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEatery,
  getEateries,
  getEatery,
  updateEatery,
  deleteEatery,
};
