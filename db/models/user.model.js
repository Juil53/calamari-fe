const { DataTypes } = require("sequelize");

const createUserModel = (sequelize) =>
  sequelize.define(
    "User",
    {
      // Model attributes are defined here
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  );

module.exports = {
  createUserModel,
};
