const { Sequelize,DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("calamari", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

//Check connection
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
// checkConnection();

//Sync with DB
const syncTable = async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
};
// syncTable();

module.exports = {
  sequelize,
  DataTypes,
}