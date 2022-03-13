'use strict'

const Clothes = (sequelize ,DataTypes) =>
sequelize.define("clothes", {
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
module.exports = Clothes;
