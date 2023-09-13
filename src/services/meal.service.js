const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a meal
 * @param {Object} mealBody
 * @returns {Promise<Eatery>}
 */
const createMeal = async (mealBody) => {
  return db.meals.create(mealBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMeal = async (filter, options) => {
  const meals = await db.meals.paginate(filter, options);
  return meals;
};

/**
 * Get eatery by id
 * @param {ObjectId} id
 * @returns {Promise<Meal>}
 */
const getMealById = async (id) => {
  return db.meals.findById(id);
};

/**
 * Update meal by id
 * @param {ObjectId} mealId
 * @param {Object} updateBody
 * @returns {Promise<Eatery>}
 */
const updateMealById = async (mealId, updateBody) => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  Object.assign(meal, updateBody);
  await db.meals.update(meal);
  return meal;
};

/**
 * Delete meal by id
 * @param {ObjectId} mealId
 * @returns {Promise<Meal>}
 */
const deleteMealById = async (mealId) => {
  const meal = await getMealById(mealId);
  if (!meal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal not found');
  }
  await db.meals.destroy(meal);
  return meal;
};

module.exports = {
  createMeal,
  queryMeal,
  getMealById,
  updateMealById,
  deleteMealById,
};
