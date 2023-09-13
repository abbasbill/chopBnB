const httpStatus = require('http-status');
// const path = require('path');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mealService } = require('../services');

const createMeal = catchAsync(async (req, res) => {
  // const { filename } = req.file;
  // req.body.thumbnail = path.join('uploads', filename);
  const meal = await mealService.createMeal(req.body);
  res.status(httpStatus.CREATED).send(meal);
});

const getMeals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mealService.queryEateries(filter, options);
  res.send(result);
});

const getMeal = catchAsync(async (req, res) => {
  const meal = await mealService.getMealById(req.params.mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  res.send(meal);
});

const updateMeal = catchAsync(async (req, res) => {
  const meal = await mealService.updateMealById(req.params.mealId, req.body);
  res.send(meal);
});

const deleteMeal = catchAsync(async (req, res) => {
  await mealService.deleteEateryById(req.params.mealId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
};
