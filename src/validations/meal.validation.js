const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMeal = {
  body: Joi.object().keys({
    tittle: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required(),
    thumbnail: Joi.string().required(),
  }),
};

const getMeals = {
  query: Joi.object().keys({
    tittle: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMeal = {
  params: Joi.object().keys({
    mealId: Joi.string().custom(objectId),
  }),
};

const updateMeal = {
  params: Joi.object().keys({
    mealId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tittle: Joi.string(),
      description: Joi.string(),
      price: Joi.number().integer(),
      thumbnail: Joi.string().required(),
    })
    .min(1),
};

const deleteMeal = {
  params: Joi.object().keys({
    mealId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
};
