const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const logger = require('../config/logger');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async function (email) {
  const eatery = await db.eateries.findOne({ where: { email } });
  logger.info(eatery);
  return !!eatery;
};

/**
 * Create a eatery
 * @param {Object} eateryBody
 * @returns {Promise<Eatery>}
 */
const createEatery = async (user, eateryBody) => {
  if (await isEmailTaken(eateryBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const newEateryBody = eateryBody;
  newEateryBody.userId = user.id;
  return db.eateries.create(newEateryBody);
};

/**
 * Query for users
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEateries = async (filter, options) => {
  const eateries = await db.eateries.findAll(filter, options);
  return eateries;
};

/**
 * Get eatery by id
 * @param {ObjectId} id
 * @returns {Promise<Eatery>}
 */
const getEateryById = async (id) => {
  return db.eateries.findById(id);
};

/**
 * Get eateries by email
 * @param {string} email
 * @returns {Promise<Eatery>}
 */
const getEateryByEmail = async (email) => {
  return db.eateries.findOne({ where: { email } });
};

/**
 * Update eatery by id
 * @param {ObjectId} eateryId
 * @param {Object} updateBody
 * @returns {Promise<Eatery>}
 */
const updateEateryById = async (eateryId, updateBody) => {
  const eatery = await getEateryById(eateryId);
  if (!eatery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Eatery not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, eateryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(eatery, updateBody);
  await db.eateries.update(eatery);
  return eatery;
};

/**
 * Delete eatery by id
 * @param {ObjectId} eateryId
 * @returns {Promise<Eatery>}
 */
const deleteEateryById = async (eateryId) => {
  const eatery = await getEateryById(eateryId);
  if (!eatery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Eatery not found');
  }
  await db.eateries.destroy(eatery);
  return eatery;
};

module.exports = {
  createEatery,
  queryEateries,
  getEateryById,
  getEateryByEmail,
  updateEateryById,
  deleteEateryById,
};
