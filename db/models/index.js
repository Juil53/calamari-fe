const { Sequelize } = require("sequelize");
const { createEventModel } = require("./event.model");
const { createUserModel } = require("./user.model");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("calamari", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

//Models
const User = createUserModel(sequelize)
const Event = createEventModel(sequelize)

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
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
};
syncTable();

module.exports = {
  User,
  Event
};
