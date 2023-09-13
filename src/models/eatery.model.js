const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const eatery = sequelize.define('eatery', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    address: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    location: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    contact: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    thumbnail: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    isCertified: {
      type: dataType.BOOLEAN,
    },
  });

  return eatery;
};
