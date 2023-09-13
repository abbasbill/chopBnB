const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eateryService } = require('../services');

const createEatery = catchAsync(async (req, res) => {
  const eatery = await eateryService.createEatery(req.user, req.body);
  res.status(httpStatus.CREATED).send(eatery);
});

const getEateries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eateryService.queryEateries(filter, options);
  res.send(result);
});

const getEatery = catchAsync(async (req, res) => {
  const eatery = await eateryService.getEateryById(req.params.eateryId);
  if (!eatery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Eatery not found');
  }
  res.send(eatery);
});

const updateEatery = catchAsync(async (req, res) => {
  const eatery = await eateryService.updateEateryById(req.params.eateryId, req.body);
  res.send(eatery);
});

const deleteEatery = catchAsync(async (req, res) => {
  await eateryService.deleteEateryById(req.params.eateryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEatery,
  getEateries,
  getEatery,
  updateEatery,
  deleteEatery,
};
