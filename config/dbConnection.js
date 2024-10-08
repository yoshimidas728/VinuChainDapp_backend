const { Sequelize } = require("sequelize");
require("dotenv").config()
console.log(process.env.DB_NAME);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DIALECT_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: process.env.DIALECT_USERNAME
});

exports.dbAuth = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
