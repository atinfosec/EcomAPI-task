const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "ecom",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
