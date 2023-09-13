module.exports = (sequelize, dataType) => {
  const meal = sequelize.define('meal', {
    tittle: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    price: {
      type: dataType.INTEGER,
      allowNull: false,
      trim: true,
    },
    thumbnail: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return meal;
};
