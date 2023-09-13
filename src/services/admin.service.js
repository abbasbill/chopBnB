const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

// const createAdminUser = async () => {
//   return userService.createAdminUsers();
// };

const adminUser = [
  {
    firstName: 'admin1',
    lastName: 'admin1',
    email: 'admin1@gmail.com',
    contact: '08012305678',
    password: bcrypt.hashSync('admin1234', 8),
    role: 'admin',
  },
];

const createAdminUsers = async () => {
  try {
    const users = await db.users.bulkCreate(adminUser);
    return users;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

module.exports = {
  createAdminUsers,
};
