const { DataTypes } = require("sequelize");

const createEventModel = (sequelize) =>
  sequelize.define(
    "Event",
    {
      // Model attributes are defined here
      start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      durationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );

module.exports = {
  createEventModel,
};
